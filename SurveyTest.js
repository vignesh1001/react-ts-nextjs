import React from "react";
import { shallow, mount } from "enzyme";
import SurveyPage from "../containers/Survey/SurveyPage.js";

const fakePatient = {
  PatientName: "Test Patient",
  Gender: "M",
  DOB: "02/23/2003",
  MRN: "123"
};
const fakePages = [
  {
    groupId: 11244,
    groupName: "Group1",
    questions: [
      {
        groupQuestionId: 21621,
        questionId: 2237,
        questionType: "Radio",
        questionText: "question 1",
        freeText: null,
        addLink: null,
        required: true,
        groupQuestionAnswers: [
          {
            groupQuestionAnswerId: 64530,
            answerId: 4386,
            answerText: "CEX_AddCommentLongTest",
            repeat: false,
            groupQuesAnsNextGroups: [
              {
                groupQuestionAnswerNextGroupId: 64530,
                groupName: "Group2",
                answerCount: null,
                answerType: null
              }
            ],
            groupQuestionAnswerKeywords: [
              {
                groupQuestionAnswerKeywordId: 3466,
                groupQuestionAnswerKeyword: "CEX_AddCommentLong",
                groupQuestionAnswerKeywordDescription:
                  "%%Placeholder Text%%LastPageTarget"
              }
            ]
          },
          {
            groupQuestionAnswerId: 64531,
            answerId: 4387,
            answerText: "NoOp Answer",
            repeat: false,
            groupQuesAnsNextGroups: [
              {
                groupQuestionAnswerNextGroupId: 64531,
                groupName: "Group2",
                answerCount: null,
                answerType: null
              }
            ],
            groupQuestionAnswerKeywords: []
          }
        ],
        groupQuestionKeywords: []
      },
      {
        groupQuestionId: 21622,
        questionId: 3741,
        questionType: "Checkbox",
        questionText: "Checkbox Test",
        freeText: null,
        addLink: null,
        required: true,
        groupQuestionAnswers: [
          {
            groupQuestionAnswerId: 64532,
            answerId: 4390,
            answerText: "Should Appear",
            repeat: false,
            groupQuesAnsNextGroups: [
              {
                groupQuestionAnswerNextGroupId: 64532,
                groupName: "Group2",
                answerCount: null,
                answerType: null
              }
            ],
            groupQuestionAnswerKeywords: [
              {
                groupQuestionAnswerKeywordId: 3467,
                groupQuestionAnswerKeyword: "CEX_AddCommentLong",
                groupQuestionAnswerKeywordDescription:
                  "%%Placeholder Text%%SamePageField"
              }
            ]
          },
          {
            groupQuestionAnswerId: 64533,
            answerId: 4391,
            answerText: "Should not appear",
            repeat: false,
            groupQuesAnsNextGroups: [
              {
                groupQuestionAnswerNextGroupId: 64533,
                groupName: "Group2",
                answerCount: null,
                answerType: null
              }
            ],
            groupQuestionAnswerKeywords: []
          }
        ],
        groupQuestionKeywords: []
      },
      {
        groupQuestionId: 21623,
        questionId: 3742,
        questionType: "FreeText",
        questionText: "comment samepage",
        freeText: {
          minLength: 1,
          maxLength: 1000,
          type: "AlphaNumeric",
          freeTextId: 7059
        },
        addLink: null,
        required: false,
        groupQuestionAnswers: [],
        groupQuestionKeywords: [
          {
            groupQuestionKeywordId: 1335,
            groupQuestionKeyword: "CEX_CommentField",
            groupQuestionKeywordDescription: "SamePageField"
          }
        ]
      },
      {
        groupQuestionId: 21624,
        questionId: 3743,
        questionType: "Checkbox",
        questionText: "Checkbox test short",
        freeText: null,
        addLink: null,
        required: false,
        groupQuestionAnswers: [
          {
            groupQuestionAnswerId: 64534,
            answerId: 4390,
            answerText: "Should Appear",
            repeat: false,
            groupQuesAnsNextGroups: [
              {
                groupQuestionAnswerNextGroupId: 64534,
                groupName: "Group2",
                answerCount: null,
                answerType: null
              }
            ],
            groupQuestionAnswerKeywords: [
              {
                groupQuestionAnswerKeywordId: 3468,
                groupQuestionAnswerKeyword: "CEX_AddCommentShort",
                groupQuestionAnswerKeywordDescription:
                  "%%Placeholder Text%%SamePageField"
              }
            ]
          },
          {
            groupQuestionAnswerId: 64535,
            answerId: 4391,
            answerText: "Should not appear",
            repeat: false,
            groupQuesAnsNextGroups: [
              {
                groupQuestionAnswerNextGroupId: 64535,
                groupName: "Group2",
                answerCount: null,
                answerType: null
              }
            ],
            groupQuestionAnswerKeywords: []
          }
        ],
        groupQuestionKeywords: []
      }
    ]
  },
  {
    groupId: 11245,
    groupName: "Group2",
    questions: [
      {
        groupQuestionId: 21625,
        questionId: 2238,
        questionType: "Radio",
        questionText: "question 2",
        freeText: null,
        addLink: null,
        required: true,
        groupQuestionAnswers: [
          {
            groupQuestionAnswerId: 64536,
            answerId: 4388,
            answerText: "CEX_AddCommentLong Test 2",
            repeat: false,
            groupQuesAnsNextGroups: [
              {
                groupQuestionAnswerNextGroupId: 64536,
                groupName: "Group3",
                answerCount: null,
                answerType: null
              }
            ],
            groupQuestionAnswerKeywords: [
              {
                groupQuestionAnswerKeywordId: 3469,
                groupQuestionAnswerKeyword: "CEX_AddCommentLong",
                groupQuestionAnswerKeywordDescription:
                  "%%Placeholder 2%%AnotherTarget"
              }
            ]
          },
          {
            groupQuestionAnswerId: 64537,
            answerId: 4387,
            answerText: "NoOp Answer",
            repeat: false,
            groupQuesAnsNextGroups: [
              {
                groupQuestionAnswerNextGroupId: 64537,
                groupName: "Group3",
                answerCount: null,
                answerType: null
              }
            ],
            groupQuestionAnswerKeywords: []
          }
        ],
        groupQuestionKeywords: []
      },
      {
        groupQuestionId: 21626,
        questionId: 2517,
        questionType: "Radio",
        questionText: "Question 3",
        freeText: null,
        addLink: null,
        required: true,
        groupQuestionAnswers: [
          {
            groupQuestionAnswerId: 64538,
            answerId: 4389,
            answerText: "AddCommentShort test",
            repeat: false,
            groupQuesAnsNextGroups: [
              {
                groupQuestionAnswerNextGroupId: 64538,
                groupName: "None",
                answerCount: null,
                answerType: null
              }
            ],
            groupQuestionAnswerKeywords: [
              {
                groupQuestionAnswerKeywordId: 3470,
                groupQuestionAnswerKeyword: "CEX_AddCommentShort",
                groupQuestionAnswerKeywordDescription:
                  "%%Placeholder test%%AnotherTarget"
              }
            ]
          },
          {
            groupQuestionAnswerId: 64539,
            answerId: 4387,
            answerText: "NoOp Answer",
            repeat: false,
            groupQuesAnsNextGroups: [
              {
                groupQuestionAnswerNextGroupId: 64539,
                groupName: "None",
                answerCount: null,
                answerType: null
              }
            ],
            groupQuestionAnswerKeywords: []
          }
        ],
        groupQuestionKeywords: []
      }
    ]
  },
  {
    groupId: 11246,
    groupName: "Group3",
    questions: [
      {
        groupQuestionId: 21627,
        questionId: 3739,
        questionType: "FreeText",
        questionText: "AnotherTarget Target",
        freeText: {
          minLength: 1,
          maxLength: 1000,
          type: "AlphaNumeric",
          freeTextId: 7060
        },
        addLink: null,
        required: false,
        groupQuestionAnswers: [],
        groupQuestionKeywords: [
          {
            groupQuestionKeywordId: 1336,
            groupQuestionKeyword: "CEX_CommentField",
            groupQuestionKeywordDescription: "AnotherTarget"
          }
        ]
      },
      {
        groupQuestionId: 21628,
        questionId: 3740,
        questionType: "FreeText",
        questionText: "LastPageTarget Target",
        freeText: {
          minLength: 1,
          maxLength: 1000,
          type: "AlphaNumeric",
          freeTextId: 7061
        },
        addLink: null,
        required: false,
        groupQuestionAnswers: [],
        groupQuestionKeywords: [
          {
            groupQuestionKeywordId: 1337,
            groupQuestionKeyword: "CEX_CommentField",
            groupQuestionKeywordDescription: "LastPageTarget"
          }
        ]
      }
    ]
  }
];
const fakeAnswerIndexes = [];
describe("SurveyPage", () => {
  let wrapper;
  const markAssessmentDoneMock = jest.fn();
  const saveAnswersMock = jest.fn();
  const switchedSurveysMock = jest.fn();
  const selectAssessmentsMock = jest.fn();
  const onHideMock = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <SurveyPage.WrappedComponent
        patient={fakePatient}
        surveyIds={[]}
        assessments={[
          {
            surveyId: "1242",
            surveyName: "surveyName",
            assessmentGroups: [{ groupName: "None" }, fakePages[0]]
          }
        ]}
        hideSurveyModal={onHideMock}
        markAssessmentDone={markAssessmentDoneMock}
        saveAnswers={saveAnswersMock}
        switchedSurvey={switchedSurveysMock}
        selectAssessments={selectAssessmentsMock}
      />
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  describe("handleCommentUpdates", () => {
    beforeEach(() => {
      wrapper.setState({ pages: fakePages, answerIndexes: fakeAnswerIndexes });
    });

    it("Should not throw error with nothing being passed", () => {
      wrapper.instance().handleCommentUpdates();
      expect(wrapper.instance().handleCommentUpdates).not.toThrow();
    });

    it("Should correctly add comment", () => {
      const comments = [
        { questionId: 2237, answerId: 4386, text: "TEST TEXT" }
      ];
      wrapper.instance().handleCommentUpdates(comments);
      wrapper.update();
      expect(
        wrapper.state("answerIndexes").find(obj => {
          obj.page == 2 && obj.qIndex == 1 && obj.text == comments.text;
        })
      ).not.toBeNull;
    });
    it("Should performFullValidation correctly", () => {
      wrapper.instance().performFullValidation();
      wrapper.update();
    });
    it("Should AutoSaver works correctly", () => {
      wrapper.instance().autoSaveHandler();
      wrapper.instance().queueAutosave();
      wrapper.instance().clearAutosave();
      wrapper.update();
    });

    it("checkSavedDraftEntry working correctly", async () => {
      // get the saved survey answers
      localStorage.setItem(fakePatient.MRN + "123", [{}]);
      localStorage.setItem(fakePatient.MRN + "123" + "_progress", "80");
      let response = await wrapper.instance().checkSavedDraftEntry();
      expect(response.answers).toBe([{}]);
      expect(response.progress).toBe("80");
      // get the offline survay answers
      // empty offline data
      localStorage.setItem(
        fakePatient.MRN + "123" + "_expire",
        moment(new Date())
          .subtract(1, "days")
          .format("MM/DD/YYYY HH:mm:ss")
      );
      response = await wrapper.instance().checkSavedDraftEntry();
      expect(response.answers).toBe([]);
      expect(response.progress).toBe(0);
      // with offline data
      localStorage.setItem(fakePatient.MRN + "123offline", [{}]);
      response = await wrapper.instance().checkSavedDraftEntry();
      expect(response.answers).toBe([{}]);
      expect(response.progress).toBe(0);
    });
    it("Should Navigate to NextPage correctly", () => {
      wrapper.instance().nextPage();
      // after allQuestionsCompleted
      wrapper.setState({allQuestionsCompleted:true});
      wrapper.instance().nextPage();
      wrapper.update();
    });

    it("Should Navigate to Previous Page correctly", () => {
      wrapper.instance().previousPage();
      wrapper.update();
    });
  });
});
