import { all, put, takeLatest, takeEvery } from "redux-saga/effects";
import es6promise from "es6-promise";
import {
  actionTypes,
  loadCandidatesSuccess,
  failure,
  saveCandidatesSuccess,
  saveJobListingSuccess,
  saveCandidatesError,
  saveJobListingError,
  loadJobListingSuccess,
  toggleLoader,
} from "./actions";
import { prepareSaveData, prepareSaveJOBListingData, prepareSearchPayload } from "./sagaUtil";
import URLS from "./constants/URL";

es6promise.polyfill();

function* loadJobListingSaga(filters) {
  try {
    yield put(toggleLoader());
    const res = yield fetch(URLS.loadJobListing, {
      method: "POST",
      body: JSON.stringify(filters.data),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
    const data = yield res.json();
    yield put(loadJobListingSuccess(data));
  } catch (err) {
    yield put(failure(err));
  }
}

function* loadCandidatesSaga(filterData) {
  try {
      const formData = prepareSearchPayload(filterData);
      const res = yield fetch(URLS.loadCandidates,{
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      });
      const data = yield res.json();
      yield put(loadCandidatesSuccess(data));
  } catch (err) {
    yield put(failure(err));
  }
}

function* saveCandidate(rData) {
  const formData = prepareSaveData(rData);
  try {
    const res = yield fetch(URLS.saveCandidate, {
      method: "POST",
      body: formData,
    });
    const data = yield res.json();
    if (data.message === "SUCCESS - " + rData.data.action) {
      yield put(saveCandidatesSuccess(data));
    } else if (data.message === "FAILED - " + rData.data.action) {
      yield put(saveCandidatesError("Error"));
    }
  } catch (e) {
    yield put(saveCandidatesError(e));
  }
}

function* saveJobListing(rData) {
  const formData = prepareSaveJOBListingData(rData);
  try {
    const res = yield fetch(URLS.saveJobListing, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
    const data = yield res.json();
    if (data.message === "SUCCESS - " + rData.data.action) {
      yield put(saveJobListingSuccess(data));
    } else if (data.message === "FAILED - " + rData.data.action) {
      yield put(saveJobListingError("Error"));
    }
  } catch (e) {
    yield put(saveJobListingError(e));
  }
}

function* rootSaga() {
  yield all([
    takeLatest(actionTypes.LOAD_CANDIDATES, loadCandidatesSaga),
    takeEvery(actionTypes.LOAD_JOBLISTING, loadJobListingSaga),
    takeLatest(actionTypes.ADD_FILTER_CRITERIA, loadCandidatesSaga),
    takeEvery(actionTypes.SAVE_CANDIDATE, saveCandidate),
    takeEvery(actionTypes.SAVE_JOBLISTING, saveJobListing),
  ]);
}

export default rootSaga;
