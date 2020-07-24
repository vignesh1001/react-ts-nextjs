import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import SurveyQuestions from "../../components/Survey/SurveyQuestions";
import { getNextPage } from "../../assessment/assessmentLogic";
import { completeAssessment, updateDraft, getDraft } from "../../services.js";
import LoadingOverlay from "../../components/LoadingOverlay/LoadingOverlay";
import CompletionScreen from "../../components/Survey/CompletionsScreen/CompletionScreen";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import moment from "moment";
import ProgressBar from "../../components/Survey/ProgressBar/ProgressBar";
import {
  getAllCompletedOfflineAssessments,
  getAllDraftAssessments,
  isOnline,
  saveOfflineSurvey,
  userIsExternal,
  removeMetaData,
  _removeOfflineExpiredSurveys,
  updatePendingAssessmentState,
  getAllPendingAssessments,
} from "../../common";
import "./SurveyPage.css";
import SurveySidebar from "../../components/PatientAssessments/SurveySidebar/SurveySidebar";

const REPEAT_VISIT_SURVEY = "CIDP Repeat Visit";
const SOC_SURVEY = "CIDP SOC";

//Component responsible for rendering Survey onto screen.
class SurveyPage extends Component {
  constructor(props) {
    super(props);

    const patient = this.props.patient;
    const dobObj = new Date(Date.parse(patient.DOB));
    const dob = dobObj.toLocaleDateString("en-US");
    const surveys = this.props.surveyIds;

    this.state = {
      isSaveClick: false,
      isSubmitClick: false,
      patientName: patient.PatientName,
      gender: patient.Gender,
      DOB: dob,
      SurveyTitle: "",
      prevProgress: 0,
      progress: 0,
      prevIndex: 0,
      index: 0,
      answerIndexes: [],
      survey: [],
      isLoading: true,
      hasError: false,
      surveyList: surveys,
      selectedSurvey: "",
      //surveyIndex: 0,
      assessmentsComplete: false,
      questionsAnswered: [],
      indexProgressStack: [],
      prepopulateAnswers: true,
      errorFields: {},
      timerValue: "",
      waitingForSelection: false,
      sectionStatus: {},
      changesSaved: false,
    };

    this.submitting = false;

    this.previousPage = this.previousPage.bind(this);
    this.lastPage = this.lastPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.submitSurvey = this.submitSurvey.bind(this);
    this.saveToLocalStorage = this.saveToLocalStorage.bind(this);
    this.findAnswer = this.findAnswer.bind(this);
    this.avoidDuplicates = this.avoidDuplicates.bind(this);
    this.checkSavedDraftEntry = this.checkSavedDraftEntry.bind(this);
    this.checkSavedOfflineEntry = this.checkSavedOfflineEntry.bind(this);
    this.handleCommentUpdates = this.handleCommentUpdates.bind(this);
    this.mapSectionStatus = this.mapSectionStatus.bind(this);
    this.autoSaveTimer = null;
    this.suppressSave = true;

    this.divRef = React.createRef();
    this.sidebarRef = React.createRef();
  }

  isSOC = (surveyName) => {
    return surveyName === "CIDP SOC" || surveyName === "CIDP Repeat Visit";
  };

  clearAutosave = () => {
    if (this.autoSaveTimer != null) {
      clearTimeout(this.autoSaveTimer);
      this.autoSaveTimer = null;
    }
  };

  queueAutosave = () => {
    this.setState({
      changesSaved: true,
    });
    this.mapSectionStatus();
    if (!this.autoSaveTimer) {
      this.autoSaveTimer = setTimeout(this.autoSaveHandler, 60000);
    }
  };

  autoSaveHandler = () => {
    // don't update local storage on auto save timer if the user has already deleted this patient's card
    if (
      getAllPendingAssessments(true).find(
        (record) => record.MRN === this.props.patient.MRN
      )
    ) {
      this.saveToLocalStorage();
    }
    this.autoSaveTimer = null;
  };

  //Checks to see if there is already an existing answer in answers array, if so removes
  avoidDuplicates(p, q) {
    var i = this.state.answerIndexes.length;
    while (i--) {
      if (
        (this.state.answerIndexes[i].page === p &&
          this.state.answerIndexes[i].qIndex === q) ||
        this.state.answerIndexes[i].page === undefined
      ) {
        this.state.answerIndexes.splice(i, 1);
      }
    }
  }

  onPageClick = (e) => {
    if (this.sidebarRef && this.sidebarRef.current) {
      this.sidebarRef.current.closeSidebar();
    }
  };

  handleCommentUpdates(comments) {
    if (!comments) {
      return;
    }
    var targObjects = {};
    comments.forEach((comment) => {
      this.state.pages.forEach((page) => {
        page.questions.forEach((question) => {
          if (question.questionId === comment.questionId) {
            question.groupQuestionAnswers.forEach((answer) => {
              if (answer.answerId === comment.answerId) {
                answer.groupQuestionAnswerKeywords.forEach((kw) => {
                  const value = kw.groupQuestionAnswerKeywordDescription;
                  var target = "INVALID_TARGET";
                  var spl = value.split("%%");
                  if (spl.length === 3) {
                    target = spl[2];
                  } else if (value && spl.length === 1) {
                    //if the target presents but the description is not present
                    target = value;
                  }
                  if (targObjects[target]) {
                    targObjects[target].push(comment.text);
                  } else {
                    targObjects[target] = [comment.text];
                  }
                });
              }
            });
          }
        });
      });
    });
    var answerCopy = this.state.answerIndexes;
    Object.keys(targObjects).forEach((target) => {
      const newAnswer = targObjects[target].join("; ");
      this.state.pages.forEach((page, pageIndex) => {
        page.questions.forEach((question, questionIndex) => {
          question.groupQuestionKeywords.forEach((kw) => {
            const keyword = kw.groupQuestionKeyword;
            const value = kw.groupQuestionKeywordDescription;
            if (keyword === "CEX_CommentField") {
              if (value === target) {
                var newObj = {
                  page: pageIndex,
                  qIndex: questionIndex,
                  answer: newAnswer,
                };
                const oldAnswer = answerCopy.findIndex((obj) => {
                  return obj.page === pageIndex && obj.qIndex === questionIndex;
                });
                if (oldAnswer > -1) {
                  answerCopy[oldAnswer] = newObj;
                } else {
                  answerCopy.push(newObj);
                }
              }
            }
          });
        });
      });
    });

    this.setState(
      {
        answerIndexes: answerCopy,
      },
      () => {
        this.saveToLocalStorage(true);
      }
    );
  }

  /* 
  receive question index and answer index
  in multiple select, answer represents array of boolean variables
  in free text, answer represents string
  in other cases, answer represents index of selected option
  */

  performFullValidation() {
    const validateCompleted = this.state.pages[this.state.index].questions.map(
      (question, index) => {
        if (!question.required || question.questionType === "Label") {
          return true;
        }
        const answer = this.state.answerIndexes.find(
          (ans) => ans.page === this.state.index && ans.qIndex === index
        );
        if (!answer || answer.answer === "" || answer.answer === "null") {
          return false;
        }
        return true;
      }
    );
    this.setState({
      questionsAnswered: validateCompleted,
    });
  }
  handleAnswerChange(index, answer) {
    if (this.suppressSave) {
      return false;
    }
    if (
      answer === "undefined" ||
      typeof answer === "undefined" ||
      answer === null
    ) {
      return;
    }
    const answers = this.state.answerIndexes;
    const answerObject = {
      page: this.state.index,
      qIndex: index,
      answer: answer,
    };
    var isRequired = false;
    if (
      this.state.pages &&
      this.state.pages[this.state.index] &&
      this.state.pages[this.state.index].questions &&
      this.state.pages[this.state.index].questions[index]
    ) {
      isRequired = this.state.pages[this.state.index].questions[index].required;
    }

    this.avoidDuplicates(this.state.index, index);
    if (answer !== "") {
      answers.push(answerObject);
    }

    const validateCompleted = this.state.questionsAnswered;

    if ((answer === "" || answer == null || answer === "null") && isRequired) {
      validateCompleted[index] = false;
    } else {
      validateCompleted[index] = true;
    }
    this.setState(
      {
        answerIndexes: answers,
        questionsAnswered: validateCompleted,
      },
      () => {
        this.queueAutosave();
      }
    );
  }

  //Finds a given answer from answers array, given the page index and question index.
  findAnswer(page, question) {
    for (let i = 0; i < this.state.answerIndexes.length; i++) {
      if (
        this.state.answerIndexes[i].page === page &&
        this.state.answerIndexes[i].qIndex === question
      ) {
        if (typeof this.state.answerIndexes[i].answer === "object") {
          const answers = this.state.answerIndexes[i].answer;
          for (var j = 0; j < answers.length; j++) {
            if (answers[j]) {
              return j;
            }
          }
        }
        return this.state.answerIndexes[i].answer;
      }
    }
  }

  mapSectionStatus() {
    var statuses = {};
    this.props.assessments.forEach((asmt) => {
      var st = {};
      this.checkSavedDraftEntry(
        asmt.surveyId,
        this.props.patient.MRN,
        true
      ).then((draft) => {
        const answers = draft.answers;

        const pages = this.getPageArray(asmt.surveyName);
        pages.forEach((page, pageIndex) => {
          let curSection;
          let curStatus = "";
          if (pageIndex > -1) {
            page.questions.forEach((question, qIndex) => {
              question.groupQuestionKeywords.forEach((kw) => {
                if (kw.groupQuestionKeyword === "CEX_Section") {
                  curSection = kw.groupQuestionKeywordDescription;
                  curStatus = "";
                }
              });

              if (question.questionType !== "Label" && curSection) {
                const answer = answers.find(
                  (ans) => ans.page === pageIndex && ans.qIndex === qIndex
                );
                const required = question.required;
                if (answer) {
                  if (curStatus === "") {
                    curStatus = "Completed";
                    st[curSection] = curStatus;
                  }
                }
                if (required && !answer) {
                  if (curStatus === "Completed") {
                    curStatus = "Started";
                    st[curSection] = curStatus;
                  }
                }
              }
            });
            //calculate next page
            let controllingQuestionIndex = page.questions.length;
            const index = pageIndex;
            do {
              controllingQuestionIndex = controllingQuestionIndex - 1;
              const answer = answers.find(
                // Do-While is important here
                // eslint-disable-next-line
                (ans) =>
                  ans.page === index && ans.qIndex === controllingQuestionIndex
              );
              if (answer) {
                pageIndex = getNextPage(
                  pages,
                  index,
                  controllingQuestionIndex,
                  answer.answer
                );
              }
            } while (pageIndex === -1 && controllingQuestionIndex > 0);
            if (pageIndex <= index || !curSection) {
              pageIndex = -1;
            }
          }
        });

        statuses[asmt.surveyName] = st;
      });
    });
    this.setState({ sectionStatus: statuses });
  }

  saveAsDraftClick = () => {
    this.saveToLocalStorage();
    this.loadNextSurvey();
  };

  //Saves survey entry to local storage
  saveToLocalStorage(suppressNetwork) {
    this.clearAutosave();
    if (this.suppressSave) {
      return;
    }
    if (this.state.selectedSurvey < 0) {
      return;
    }
    if (!userIsExternal()) {
      const curProgress =
        localStorage.getItem(
          this.props.patient.MRN + this.state.selectedSurvey + "_progress"
        ) || 0;
      if (this.state.answerIndexes.length > 0) {
        updatePendingAssessmentState(
          this.props.patient.MRN,
          this.state.selectedSurvey,
          {
            firstName: this.props.patient.FirstName,
            lastName: this.props.patient.PatientLastName,
            MRN: this.props.patient.MRN,
            DOB: moment(new Date(Date.parse(this.props.patient.DOB))).format(
              "MM/DD/YYYY"
            ),
          }
        );
        localStorage.setItem(
          this.props.patient.MRN + this.state.selectedSurvey,
          JSON.stringify(this.state.answerIndexes)
        );
        localStorage.setItem(
          this.props.patient.MRN + this.state.selectedSurvey + "_expire",
          moment()
            .add(72, "hours")
            .format("MM/DD/YYYY HH:mm:ss")
        );
        localStorage.setItem(
          this.props.patient.MRN + this.state.selectedSurvey + "_progress",
          Math.max(this.state.progress, curProgress)
        );
        if (!suppressNetwork) {
          updateDraft(
            this.props.patient.MRN,
            this.state.selectedSurvey,
            this.state.answerIndexes,
            this.state.pages
          );
        }
        this.forceUpdate();
      }
    }
  }

  loadNextSurvey = () => {
    const newIndex = this.getNextIndex();

    if (newIndex >= 0) {
      const newId = this.state.surveyList[newIndex];
      this.loadSurvey(newId);
    } else {
      this.props.hideSurveyModal();
    }
  };

  componentWillUnmount() {
    this.saveToLocalStorage();
    this.clearAutosave();
  }

  submitSurvey() {
    if (this.submitting) {
      return false;
    }
    this.submitting = true;
    this.setState({ isLoading: true }, () => {
      if (!isOnline()) {
        this.props.markAssessmentDone(this.state.selectedSurvey);
        saveOfflineSurvey(
          this.state.selectedSurvey,
          this.state.SurveyTitle,
          this.state.answerIndexes,
          this.props.patient,
          this.props.diagnosis
        );

        this.setState({
          isLoading: true,
          allQuestionsCompleted: false,
          progress: 100,
        });

        localStorage.setItem(
          this.props.patient.MRN +
            this.state.selectedSurvey +
            "_offline_expire",
          moment()
            .add(168, "hours")
            .format("MM/DD/YYYY HH:mm:ss")
        );

        if (this.state.surveyList.length === 1) {
          this.props.hideSurveyModal();
          this.setState({ isLoading: false });
          this.submitting = false;
        } else {
          if (
            this.state.survey.surveyName === SOC_SURVEY ||
            this.state.survey.surveyName === REPEAT_VISIT_SURVEY
          ) {
            this.setState({
              waitingForSelection: true,
            });
            this.setState({ isLoading: false });
            this.submitting = false;
            return;
          }
          this.loadNextSurvey();
          this.setState({ isLoading: false });
          this.submitting = false;
        }
        return;
      }

      completeAssessment(
        this.state.survey,
        this.state.pages,
        this.state.answerIndexes,
        this.props
      ).then((completion) => {
        if (!completion || completion == null) {
          this.setState({
            hasError: true,
            error:
              "Unable to submit this survey at this time. This survey has been saved as a draft. Please resubmit at a later time.",
          });
          this.setState({ isLoading: false });
          this.submitting = false;
          return;
        }
        this.props.markAssessmentDone(this.state.selectedSurvey);

        localStorage.removeItem(
          this.props.patient.MRN + this.state.selectedSurvey
        );
        localStorage.removeItem(
          this.props.patient.MRN + this.state.selectedSurvey + "_expire"
        );
        localStorage.removeItem(
          this.props.patient.MRN + this.state.selectedSurvey + "_progress"
        );
        _removeOfflineExpiredSurveys(
          this.props.patient.MRN,
          this.state.selectedSurvey
        );

        var draftList = getAllDraftAssessments(this.props.patient.MRN);
        var offlineCompletedList = getAllCompletedOfflineAssessments(
          this.props.patient.MRN
        );

        var totalComplete = offlineCompletedList.length;
        var totalIncomplete = draftList.length;

        if (totalIncomplete === 0 && totalComplete === 0) {
          removeMetaData(this.props.patient.MRN);
        }

        this.setState(
          {
            isLoading: true,
            allQuestionsCompleted: false,
            progress: 100,
            isSubmitClick: true,
            completionId: completion.completionId,
            indexProgressStack: [],
          },
          () => {
            if (this.state.surveyList.length === 1) {
              this.props.hideSurveyModal();
              this.setState({ isLoading: false });
              this.submitting = false;
            } else {
              if (
                this.state.survey.surveyName === "CIDP SOC" ||
                this.state.survey.surveyName === REPEAT_VISIT_SURVEY
              ) {
                this.setState({
                  waitingForSelection: true,
                  selectedSurvey: -1,
                });
                this.setState({ isLoading: false });
                this.submitting = false;
                return;
              }
              this.loadNextSurvey();
              this.setState({ isLoading: false });
              this.submitting = false;
            }
          }
        );
      });
    });
  }

  getNextIndex = (ind) => {
    const surveyIds = this.state.surveyList;
    var curIndex = surveyIds.findIndex(
      (id) => this.state.survey.surveyId === id
    );

    if (ind) {
      curIndex = ind;
    }

    for (var i = curIndex + 1; i < surveyIds.length; i++) {
      const thresh = this.checkThreshold(surveyIds[i]);
      if (thresh) {
        return i;
      }
    }

    for (i = 0; i < curIndex; i++) {
      const thresh = this.checkThreshold(surveyIds[i]);
      if (thresh) {
        return i;
      }
    }

    return -1;
  };

  removeSkippedAnswersHistory(currentPage, previousPage) {
    if (currentPage > 1 && currentPage - previousPage > 1) {
      var pageToRemove = previousPage + 1;
      var length = this.state.answerIndexes.length;
      for (let j = length - 1; j >= 0; j--) {
        if (this.state.answerIndexes[j].page === pageToRemove) {
          this.state.answerIndexes.splice(j, 1);
        }
      }
    }
  }

  /* To determine next page, required parameters include:
     1. current page where question is answered
     2. controlling question is the one that determines next page,
        if it's a page that contains questionnaire, then controlling questions is the last one
     3. index of selected answer for controlling question
     4. survey pages object
     */
  nextPage() {
    this.mapSectionStatus();
    if (!this.state.allQuestionsCompleted) {
      /* reset questions to the top of the page */
      this.divRef.current.scrollTo(0, 0);
    }

    const numberOfQuestions = this.state.pages[this.state.index].questions
      .length;
    var controllingQuestionIndex = numberOfQuestions - 1;
    var answerIndex = this.findAnswer(
      this.state.index,
      controllingQuestionIndex
    );

    /* validation check for questions */
    var passed = true;

    if (
      !(
        (this.state.SurveyTitle === "CIDP SOC" ||
          this.state.SurveyTitle === REPEAT_VISIT_SURVEY) &&
        this.state.answerIndexes.length !== 0
      )
    ) {
      const currentPage = this.state.pages[this.state.index];
      var errors = this.state.errorFields;
      var answerIndexes = this.state.answerIndexes;
      currentPage.questions.forEach((question, qIndex) => {
        const isRequired = question.required;

        var foundObject = answerIndexes.find((answer) => {
          return answer.qIndex === qIndex && answer.page === this.state.index;
        });

        if (!foundObject && question.questionType !== "Label") {
          var answerObject = {
            page: this.state.index,
            qIndex: qIndex,
            answer: "",
          };

          answerIndexes.push(answerObject);
        }
        // we are checking if the foundobject is undefined or foundobect is exist but the answer doesn't
        // the foundobject is empty for the first time when we click on the survey and without answers click on Next button
        if (
          (!foundObject ||
            (foundObject &&
              (foundObject.answer === "" ||
                typeof foundObject.answer == "undefined"))) &&
          this.state.questionsAnswered[qIndex] === false &&
          isRequired
        ) {
          errors[qIndex] = true;
          passed = false;
        } else {
          errors[qIndex] = false;
        }

        answerIndexes.sort((a, b) => {
          return a.page - b.page || a.qIndex - b.qIndex;
        });

        this.setState({ answerIndexes: answerIndexes, errorFields: errors });
      });
    }

    //updating pending assessments even when we click on next button 
    updatePendingAssessmentState(
      this.props.patient.MRN,
      this.state.selectedSurvey,
      {
        firstName: this.props.patient.FirstName,
        lastName: this.props.patient.PatientLastName,
        MRN: this.props.patient.MRN,
        DOB: moment(new Date(Date.parse(this.props.patient.DOB))).format(
          "MM/DD/YYYY"
        ),
      }
    );

    if (passed) {
      var nextPage = getNextPage(
        this.state.pages,
        this.state.index,
        controllingQuestionIndex,
        answerIndex
      );

      while (nextPage === -1 && controllingQuestionIndex > 0) {
        controllingQuestionIndex = controllingQuestionIndex - 1;
        answerIndex = this.findAnswer(
          this.state.index,
          controllingQuestionIndex
        );
        nextPage = getNextPage(
          this.state.pages,
          this.state.index,
          controllingQuestionIndex,
          answerIndex
        );

        if (nextPage === -1) {
          if (
            this.state.pages[this.state.index].questions &&
            !this.state.pages[this.state.index].questions.find(
              (item) => item.required
            )
          ) {
            if (this.state.index + 1 < this.state.pages.length) {
              nextPage = this.state.index + 1;
            }
          }
        }
      }
      if (nextPage === -1 && !this.state.allQuestionsCompleted) {
        this.setState({ allQuestionsCompleted: true, progress:"100" }, 
        
        () => {
          this.saveToLocalStorage();
        });

      } else {
        /* reset question values back to false */
        const questionsToComplete = this.state.pages[nextPage].questions.map(
          (question, qIndex) => {
            return question.questionType === "Label";
          }
        );

        //getting prevc surveyid,surveyname,surveyindecx for updating survey side bar
        this.handleNextandPrevPages(this.state, nextPage);

        const previousPage = {
          index: this.state.index,
          progress: this.state.progress,
        };

        const historyStack = this.state.indexProgressStack;
        historyStack.push(previousPage);

        this.setState(
          {
            prevIndex: this.state.index,
            index: nextPage,
            prevProgress: this.state.progress,
            progress: Math.round((nextPage / this.state.pages.length) * 100),
            questionsAnswered: questionsToComplete,
            indexProgressStack: historyStack,
          },
          () => {
            this.saveToLocalStorage();
            this.divRef.current.scrollTo(0, 0);
          }
        );

        /* when decision logic for the page prompts to skip a page,
           check whether there were previously stored answers for page
           that won't exist;
           ex. IG Administration Survey pages 0, 1, 2 where page 0 answer is decision
        */
        this.removeSkippedAnswersHistory(
          this.state.index,
          this.state.prevIndex
        );
      }
    }
  }

  lastPage(allQuestionsCompleted) {
    if (
      allQuestionsCompleted !== null &&
      (allQuestionsCompleted === true || allQuestionsCompleted === false)
    ) {
      this.setState({ allQuestionsCompleted: allQuestionsCompleted });
    }
  }

  //Goes to previous page on Survey
  previousPage() {
    var questionsToComplete = [];
    for (
      var i = 0;
      i < this.state.pages[this.state.prevIndex].questions.length;
      i++
    ) {
      if (
        this.state.pages[this.state.prevIndex].questions[i].questionType ===
        "Label"
      ) {
        questionsToComplete[i] = true;
      } else {
        questionsToComplete[i] = false;
      }
    }
    this.handleNextandPrevPages(this.state, this.state.prevIndex);
    let prevI;
    let prevP;
    if (this.state.indexProgressStack.length > 1) {
      this.state.indexProgressStack.pop();
      prevI = this.state.indexProgressStack[
        this.state.indexProgressStack.length - 1
      ].index;
      prevP = this.state.indexProgressStack[
        this.state.indexProgressStack.length - 1
      ].progress;
    } else {
      prevI = 0;
      prevP = 0;
    }

    this.setState(
      (state) => ({
        progress: state.prevProgress,
        prevProgress: prevP,
        index: state.prevIndex,
        prevIndex: prevI,
        questionsAnswered: questionsToComplete,
        errorFields: {},
      }),
      () => {
        this.divRef.current.scrollTo(0, 0);
      }
    );
  }

  getPageArray = (surveyName) => {
    const survey = this.props.assessments.find(
      (asmt) => asmt.surveyName === surveyName
    );
    if (
      typeof survey == "undefined" ||
      typeof survey.assessmentGroups == "undefined"
    ) {
      return [];
    }
    const pages = [];

    survey.assessmentGroups.forEach((group) => {
      // if we are iterating through the last group (which is always called "None")
      if (group.groupName === "None") {
        // then we can end the function
      } else {
        // push the group object to pages array
        pages.push({
          groupId: group.groupId,
          groupName: group.groupName,
          questions: group.groupQuestions,
        });
      }
    });

    return pages;
  };
  //Creates the page array that contains the different pages in the Survey
  initializePageArray() {
    const survey = this.state.survey;

    const pages = this.getPageArray(survey.surveyName);
    if (!pages || pages.length === 0) {
      this.setState({ error: "Survey is undefined", hasError: true });
      return;
    }

    /* validation check for questions */
    var questionsToComplete = [];
    var length = pages[this.state.index].questions.length;

    for (var i = 0; i < length; i++) {
      const isRequired = pages[this.state.index].questions[i].required;

      if (pages[this.state.index].questions[i].questionType === "Label") {
        questionsToComplete[i] = true;
      } else if (!isRequired) {
        questionsToComplete[i] = true;
      } else {
        questionsToComplete[i] = false;
      }
    }

    this.setState(
      {
        pages: pages,
        questionsAnswered: questionsToComplete,
        isLoading: false,
      },
      () => {
        this.suppressSave = false;
        this.performFullValidation();
      }
    );
  }

  //check if a survey's threshold has been met
  checkThreshold = (surveyId) => {
    const assmt = this.props.assessments.find(
      (assessment) => assessment.surveyId === surveyId
    );
    if (assmt) {
      return assmt.isTakeable;
    }
    return true;
  };

  //Loads a specific survey using information retreived from CEX API call, and populates state variables with information from call.
  loadSurvey(selSurvey, pageIndex = 0) {
    this.suppressSave = true;
    this.clearAutosave();
    this.setState(
      {
        error: null,
        SurveyTitle: "",
        prevProgress: 0,
        progress: 0,
        prevIndex: pageIndex - 1 || 0,
        index: pageIndex || 0,
        survey: [],
        isLoading: true,
        hasError: false,
        allQuestionsCompleted: false,
        answerIndexes: [],
        pages: [],
      },
      () => {
        const assessments = this.props.assessments;
        let pages = [];
        assessments.forEach((assessment) => {
          if (assessment.surveyId === selSurvey) {
            pages = this.getPageArray(assessment.surveyName);
            this.setState(
              {
                waitingForSelection: false,
                survey: assessment,
                selectedSurvey: selSurvey,
                SurveyTitle: assessment.surveyName,
                // isLoading: false,
              },
              () => {
                this.checkSavedDraftEntry(
                  selSurvey,
                  this.props.patient.MRN
                ).then((draft) => {
                  this.setState(
                    {
                      answerIndexes: draft.answers || [],
                      // progress: draft.progress || 0,
                      progress: pages
                        ? Math.round((pageIndex / pages.length) * 100)
                        : 0,
                      changesSaved: draft.answers.length > 0,
                    },
                    () => {
                      this.initializePageArray();
                      if (this.props.switchedSurvey) {
                        this.props.switchedSurvey(selSurvey);
                      }
                    }
                  );
                });
              }
            );
          }
        });
      }
    );
  }

  //check if survey was saved locally in order to prepopulate answers
  //also checks if saved draft has expired, if so deletes from local storage
  async checkSavedDraftEntry(surveyId, mrn, suppressNetwork) {
    var expireTime = localStorage.getItem(mrn + surveyId + "_expire");
    if (expireTime != null && expireTime !== "") {
      const expTime = moment(expireTime, "MM/DD/YYYY HH:mm:ss");
      const now = moment();
      if (expTime != null && expTime.isBefore(now)) {
        localStorage.removeItem(mrn + surveyId);
        localStorage.removeItem(mrn + surveyId + "_expire");
        localStorage.removeItem(mrn + surveyId + "_progress");
      }
    }
    const offlineDraft = this.checkSavedOfflineEntry(surveyId, mrn);
    if (localStorage.getItem(mrn + surveyId) != null) {
      var answers = JSON.parse(localStorage.getItem(mrn + surveyId));
      var progress = 0;

      if (localStorage.getItem(mrn + surveyId + "_progress")) {
        progress = localStorage.getItem(mrn + surveyId + "_progress");
      }
      return {
        answers: answers,
        progress: progress,
      };
    } else if (offlineDraft && offlineDraft.answers.length > 0) {
      return offlineDraft;
    } else {
      if (isOnline() && !suppressNetwork) {
        if (mrn && surveyId) {
          const res = await getDraft(mrn, surveyId);
          if (res != null && res.answers != null && !res.error) {
            return {
              answers: JSON.parse(res.answers),
              progress: 0,
            };
          } else {
            return {
              answers: [],
              progress: 0,
            };
          }
        }
      } else {
        return {
          answers: [],
          progress: 0,
        };
      }
    }
  }

  //checks to see if offline entry exists, if does then loads from local storage.
  checkSavedOfflineEntry(surveyId, mrn) {
    const keys = Object.keys(localStorage);
    const offlineKey = keys.find(
      (key) =>
        key.endsWith("offline") && key.includes(surveyId) && key.includes(mrn)
    );
    if (offlineKey !== undefined) {
      const answers = JSON.parse(localStorage.getItem(offlineKey));
      return {
        answers: answers,
        progress: 0,
      };
    }
    return {
      answers: [],
      progress: 0,
    };
  }

  //Extracts mrn from URL path and sets state variable to it.  Also sets the current survey based off of whether user clicked 'Start All Assessments' or
  //clicked on a individual survey.
  componentDidMount() {
    if (this.props.location) {
      const patMRN = this.props.location.pathname.split("/surveys/").pop();
      this.setState({ mrn: patMRN });
    }

    if (this.props) {
      const surveyIds = this.state.surveyList;
      var selSurvey = this.state.selectedSurvey;

      if (selSurvey === "") {
        selSurvey = surveyIds[0];
        if (this.checkThreshold(selSurvey) === false) {
          const ind = this.getNextIndex(0);
          if (ind === -1) {
            this.props.hideSurveyModal();
          } else {
            selSurvey = surveyIds[ind];
          }
        }
      }

      this.setState({
        selectedSurvey: selSurvey,
      });
      this.loadSurvey(selSurvey);
      this.mapSectionStatus();
    }
  }

  //Handles error that occurs in child components
  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
      error,
      info,
    });
  }

  onSurveyClick = (surveyId, page) => {
    //when we click on the survey we should make the error fields empty if there any
    //if not do, the previous error fields will be passed to the new survey
    this.setState({
      errorFields: {},
    });
    if (typeof page == "number") {
      this.saveToLocalStorage();
      this.loadSurvey(surveyId, page);
      if (this.state.selectedSurvey === surveyId) {
        this.setState({
          index: page,
        });
      }
      return;
    }
    //check if we aren't already on the survey
    if (this.state.survey.surveyId !== surveyId) {
      //we use survey threshold to see if a survey can be done
      var threshold = this.checkThreshold(surveyId);
      if (threshold) {
        this.saveToLocalStorage();
        this.loadSurvey(surveyId);
        this.mapSectionStatus();
      }
    }
  };

  selectAssessments = () => {
    if (this.props.selectAssessments) {
      this.props.selectAssessments();
    }
  };

  handleSelectedSurvey = (
    surveyId,
    selectedSectionIndex,
    selectedSectionName
  ) => {
    this.setState({
      selectedSurveyId: surveyId,
      selectedSectionIndex,
      selectedSectionName,
    });
  };
  handleNextandPrevPages = (state, nextPage) => {
    //getting next surveyid,surveyname,surveyindecx for updating survey side bar
    if (state.pages && state.pages[nextPage]) {
      const surveyId = state.survey && state.survey["surveyId"];
      const sectionIndex = nextPage;
      const sectionName = state.pages[nextPage].groupName;

      this.handleSelectedSurvey(surveyId, sectionIndex, sectionName);
    }
  };
  render() {
    var loadMessage;
    const saveClick = this.state.isSaveClick;
    const submitClick = this.state.isSubmitClick;
    const mrn = this.props.patient.MRN || this.props.patient.mrn;

    const surveyId = this.state.survey && this.state.survey.surveyId;

    if (this.state.isLoading) {
      if (saveClick) {
        loadMessage = (
          <LoadingOverlay active={this.state.isLoading} text={"...Saving"} />
        );
      } else if (submitClick) {
        loadMessage = (
          <LoadingOverlay active={this.state.isLoading} text={"Submitting"} />
        );
      } else {
        loadMessage = (
          <LoadingOverlay
            active={this.state.isLoading}
            text={"Loading survey..."}
          />
        );
      }

      return <div>{loadMessage}</div>;
    }
    //add progress object to each assessment for sidebar
    const assessments = this.props.assessments.map((assessment) => {
      var progress = localStorage.getItem(
        mrn + assessment.surveyId + "_progress"
      );
      if (progress) {
        assessment.progress = progress;
      } else {
        assessment.progress = 0;
      }
      return assessment;
    });
    var sidebar = (
      <SurveySidebar
        assessments={assessments}
        selected={surveyId}
        onSurveyClick={this.onSurveyClick}
        selectAssessments={this.selectAssessments}
        defaultOpen={this.state.waitingForSelection}
        handleSelectedSurvey={this.handleSelectedSurvey}
        selectedSurveyId={this.state.selectedSurveyId}
        selectedSectionName={this.state.selectedSectionName}
        selectedSectionIndex={this.state.selectedSectionIndex}
        getSectionStatus={this.getSectionStatus}
        sectionData={this.state.sectionStatus}
        ref={this.sidebarRef}
      />
    );

    if (this.state.waitingForSelection) {
      return sidebar;
    }

    if (
      this.state.survey.surveyName === "CIDP SOC" ||
      this.state.survey.surveyName === REPEAT_VISIT_SURVEY
    ) {
      sidebar = null;
    }

    if (this.state.hasError) {
      return <h1 className='HeadingMediumLight'>{this.state.error}</h1>;
    }
    if (this.state.allQuestionsCompleted && this.state.progress !== 100) {
      return (
        <CompletionScreen
          isCPR={this.state.survey.surveyType === "CPR"}
          submitSurvey={this.submitSurvey}
          surveyTitle={this.state.SurveyTitle}
          saveAsDraftClick={this.saveAsDraftClick}
          lastPage={this.lastPage}
          mrn={this.state.mrn}
          pages={this.state.pages}
          answers={this.state.answerIndexes.filter((ans) => {
            const page = ans.page;
            const qIndex = ans.qIndex;
            const pageArr = this.state.pages[page];
            const question = pageArr.questions[qIndex];
            if (question && question.groupQuestionKeywords) {
              for (var i = 0; i < question.groupQuestionKeywords.length; i++) {
                var gp = question.groupQuestionKeywords[i];
                if (gp.groupQuestionKeyword === "CEX_CommentField") {
                  return false;
                }
              }
            }
            return true;
          })}
          offlineMode={!isOnline()}
        />
      );
    }

    return (
      <div id='SurveyContainer' ref={this.divRef}>
        {sidebar}
        <div
          id={
            this.state.SurveyTitle === "CIDP SOC" ||
            this.state.SurveyTitle === REPEAT_VISIT_SURVEY
              ? "CIDPSOCSurveyPage"
              : "SurveyPage"
          }
          style={{ clear: "both", paddingBottom: 30 }}
          onClick={this.onPageClick}>
          <div id='SurveyPageTextHeaderContent'>
            <h3
              id={
                this.state.SurveyTitle === "CIDP SOC" ||
                this.state.SurveyTitle === REPEAT_VISIT_SURVEY
                  ? "CIDPSOCSurveyModalTitle"
                  : "SurveyModalTitle"
              }
              className='HeadingMediumLight SurveyModalTitle'>
              {(() => {
                if (this.state.SurveyTitle === "CIDP SOC") {
                  return "CIDP Start of Care";
                } else {
                  return this.state.SurveyTitle;
                }
              })()}
            </h3>
            <div className='HeadingSmallLight' id='ChangesSavedText'>
              {this.state.changesSaved
                ? "Changes have been saved"
                : "No changes made"}
            </div>
          </div>
          <hr />
        </div>

        {this.state.pages && (
          <div
            style={{
              clear: "both",
              flex: 1,
              flexDirection: "column",
            }}
            className={this.state.slideClass}
            onClick={this.onPageClick}>
            <Row>
              <Col>
                <SurveyQuestions
                  surveyInfo={this.state}
                  handleAnswerChange={this.handleAnswerChange.bind(this)}
                  commentUpdate={this.handleCommentUpdates}
                />
              </Col>
            </Row>
          </div>
        )}
        <div style={{ minWidth: "100%" }} onClick={this.onPageClick}>
          <ProgressBar progress={this.state.progress} />
        </div>
        <div
          className='BottomSeparator BottomSeperatorDiv'
          onClick={this.onPageClick}>
          <div
            className='SecondaryLink PreviousContainer'
            style={userIsExternal() ? { width: "90%" } : {}}>
            <Link
              id='PreviousLink'
              className='BodyLargeLight'
              style={{
                color: "var(--InteractionBlue)",
                display:
                  this.state.index === 0 || this.state.progress === 100
                    ? "none"
                    : "block",
              }}
              onClick={this.previousPage}>
              Previous
            </Link>
          </div>
          {!userIsExternal() && (
            <div className='SecondaryLink NonPreviousContainer'>
              <Link
                id='SaveLink'
                className='BodyLargeLight'
                style={{
                  width: "100%",
                  textAlign: "right",
                  color: "var(--InteractionBlue)",
                  display:
                    this.state.SurveyTitle === "CIDP SOC" ||
                    this.state.SurveyTitle === REPEAT_VISIT_SURVEY
                      ? "none"
                      : "block",
                }}
                onClick={this.saveAsDraftClick}>
                Save as draft
              </Link>
            </div>
          )}
          <div className='SecondaryLink NonPreviousContainer'>
            <Link
              id='NextLink'
              className='BodyLargeBold NextLink'
              onClick={this.nextPage}>
              Next
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SurveyPage);
