import { all, put, takeLatest, takeEvery } from "redux-saga/effects";
import es6promise from "es6-promise";

import {
  actionTypes,
  loadCandidatesSuccess,
  loadResumeDataSuccess,
  failure,
  saveCandidatesSuccess,
  saveJobListingSuccess,
  saveCandidatesError,
  saveJobListingError
} from "./actions";
import { prepareSaveData, prepareSaveJOBListingData } from "./sagaUtil";

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
  const formData = prepareSaveData(rData);
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

function* saveJobListing(request) {
  const formData = prepareSaveJOBListingData(rData);
  try {
    const res = yield fetch(
      "https://k642djkdmf.execute-api.us-east-2.amazonaws.com/V2/candidate",
      { method: "POST", body: formData }
    );
    const data = yield res.json();
    if (data.message === "SUCCESS") {
      yield put(saveJobListingSuccess(data));
    } else if (data.message === "FAILED") {
      yield put(saveJobListingError("Error"));
    }
  } catch (e) {
    yield put(saveJobListingError(e));
  }
}

function* rootSaga() {
  yield all([
    takeLatest(actionTypes.LOAD_CANDIDATES, loadCandidatesSaga),
    takeLatest(actionTypes.LOAD_RESUMES, loadResumesSaga),
    takeLatest(actionTypes.ADD_FILTER_CRITERIA, loadCandidatesSaga),
    takeEvery(actionTypes.SAVE_CANDIDATE, saveCandidate),
    takeEvery(actionTypes.SAVE_JOBLISTING, saveJobListing)
  ]);
}

export default rootSaga;
