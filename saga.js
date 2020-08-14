import { all, put, takeLatest, takeEvery } from "redux-saga/effects";
import es6promise from "es6-promise";

import {
  actionTypes,
  loadCandidatesSuccess,
  loadResumeDataSuccess,
  failure,
  saveCandidatesSuccess,
  saveCandidatesError
} from "./actions";

es6promise.polyfill();

function* loadCandidatesSaga(filterData) {
  const { data } = filterData;
  const { filterSkills, filterTitle, filterLocation } = data;
  const title = filterTitle ? filterTitle.value : "";
  const skills = filterSkills ? filterSkills.map(i => i.value).join(",") : "";
  try {
    const url = [];
    if (title) {
      url.push("title=" + title);
    }
    if (skills) {
      if (url.length) url.push("&");
      url.push("skill=" + skills);
    }
    if (filterLocation) {
      if (url.length) url.push("&");
      url.push("location=" + filterLocation);
    }
    if (url.length) {
      const res = yield fetch(
        "https://k642djkdmf.execute-api.us-east-2.amazonaws.com/V2/candidate/search?".concat(
          url.join("")
        )
      );
      // const res = yield fetch("http://localhost:3030/candidates");
      const data = yield res.json();
      yield put(loadCandidatesSuccess(data));
    }
  } catch (err) {
    yield put(failure(err));
  }
}

function* loadResumesSaga() {
  try {
    const resumes = [
      {
        fileName: "Placeholder Resume 1",
        labels: [
          {
            name: "Front End Developer",
            score: 0.34
          },
          {
            name: "Java Developer",
            score: 0.89
          }
        ]
      },
      {
        fileName: "Placeholder Resume 2",
        labels: [
          {
            name: "IOS Developer",
            score: 0.65
          },
          {
            name: "Android Developer",
            score: 0.75
          }
        ]
      }
    ];
    yield put(loadResumeDataSuccess(resumes));
  } catch (err) {
    yield put(failure(err));
  }
}

function* saveCandidate(rData) {
  const { data: request } = rData;
  const formData = new FormData();
  const payment = {
    payAmount: request.annualBaseSalary,
    payRate: request.rate,
    payRatePeriod: "1.0",
    payType: request.empWorkType,
    vendorPayType: " ",
    bonusInPercentage: request.annualBonusPct,
    benifit: request.empBenefits
  };

  formData.append("file", request.candidate_resume[0]);
  formData.append("fileName", request.candidate_resume[0].name);
  formData.append("payment", payment);
  formData.append("fullName", request.fullName);
  formData.append("email", request.emailAddress);
  formData.append("phone", request.phone);
  formData.append("city", request.city);
  formData.append("state", request.state);
  formData.append("zip", request.zip);
  formData.append("country", request.country);
  formData.append("immigrationStatus", request.immigrationStatus);
  formData.append("ssn", request.SSN);
  formData.append("dateOfBirth", request.dob);
  formData.append("workAuthorizationForm", request.workAuthForm[0]);

  formData.append("employmentType", request.employmentType);
  //formData.append("", request.annualBaseSalary );// missing
  //formData.append("", request.annualBonusPct );// missing
  //formData.append("", request. empBenefits);// missing
  //formData.append("", request.empWorkType );// missing
  //formData.append("", request.rate );// missing
  formData.append("availability", request.availability);
  formData.append("securityClearance", request.securityClearance);
  formData.append("travelPreferences", request.travelPreferences);
  formData.append("openToRelocate", request.openToRelocate);
  formData.append("positionTitle", request.positionTitle);
  formData.append("professionalExperience", request.professionalExperience);
  formData.append("additionalNotes", request.additionalNotes);
  formData.append("primarySkills", request.primarySkills);
  formData.append("otherSkills", request.otherSkills);
  formData.append("yearOfCompletion", request.yearOfCompletion);
  formData.append("education", request.educations); // ?? Array
  formData.append("certifications", request.certifications); // ?? Array
  const references = [];
  request.references.forEach(
    ({ fullName, position, relationship, email, phone }) => {
      references.push({
        fullName,
        position,
        relationship,
        communication: { email, phone }
      });
    }
  );
  formData.append("references", request.references); // ?? Array
  formData.append("salesManager", request.salesLead);
  formData.append("recruitingManager", request.recruittingLead);
  // formData.append("", request.submitToRequirement ); // missing
  try {
    const res = yield fetch(
      "https://k642djkdmf.execute-api.us-east-2.amazonaws.com/V2/candidate",
      { method: "POST", body: formData }
    );
    const data = yield res.json();
    if (data.message === "SUCCESS") {
      yield put(saveCandidatesSuccess(data));
    } else if (data.message === "FAILED") {
      yield put(saveCandidatesError("Error"));
    }
  } catch (e) {
    yield put(saveCandidatesError(e));
  }
}

function* rootSaga() {
  yield all([
    takeLatest(actionTypes.LOAD_CANDIDATES, loadCandidatesSaga),
    takeLatest(actionTypes.LOAD_RESUMES, loadResumesSaga),
    takeLatest(actionTypes.ADD_FILTER_CRITERIA, loadCandidatesSaga),
    takeEvery(actionTypes.SAVE_CANDIDATE, saveCandidate)
  ]);
}

export default rootSaga;
