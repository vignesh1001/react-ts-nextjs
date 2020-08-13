import { all, put, takeLatest } from "redux-saga/effects";
import es6promise from "es6-promise";

import {
  actionTypes,
  loadCandidatesSuccess,
  loadResumeDataSuccess,
  failure
} from "./actions";

es6promise.polyfill();

function* loadCandidatesSaga(filterData) {
  const { data } = filterData;
  const title = data.filterTitle ? data.filterTitle.value : "";
  try {
    const res = yield fetch("http://localhost:3030/candidates");

    const data = yield res.json();
    yield put(loadCandidatesSuccess(data));
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
    console.log(err);
    yield put(failure(err));
  }
}

function* rootSaga() {
  yield all([
    takeLatest(actionTypes.LOAD_CANDIDATES, loadCandidatesSaga),
    takeLatest(actionTypes.LOAD_RESUMES, loadResumesSaga),
    takeLatest(actionTypes.ADD_FILTER_CRITERIA, loadCandidatesSaga)
  ]);
}

export default rootSaga;
