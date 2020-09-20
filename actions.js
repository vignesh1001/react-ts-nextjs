export const actionTypes = {
  CLEARALL: "CLEARALL",
  ADD_CANDIDATE_SAVE: "ADD_CANDIDATE_SAVE",
  SAVE_CANDIDATE: "SAVE_CANDIDATE",
  SAVE_CANDIDATE_SUCCESS: "SAVE_CANDIDATE_SUCCESS",
  SAVE_CANDIDATE_FAILURE: "SAVE_CANDIDATE_FAILURE",
  SELECTED_CANDIDATE: "SELECTED_CANDIDATE",
  SAVE_JOBLISTING: "SAVE_JOBLISTING",
  SAVE_JOBLISTING_SUCCESS: "SAVE_JOBLISTING_SUCCESS",
  SAVE_JOBLISTING_FAILURE: "SAVE_JOBLISTING_FAILURE",
  LOAD_CANDIDATES: "LOAD_CANDIDATES",
  LOAD_CANDIDATES_SUCCESS: "LOAD_CANDIDATES_SUCCESS",
  ADD_FILTER_CRITERIA: "ADD_FILTER_CRITERIA",
  FAILURE: "FAILURE",
  LOAD_JOBLISTING: "LOAD_JOBLISTING",
  LOAD_JOBLISTING_SUCCESS: "LOAD_JOBLISTING_SUCCESS",
  TOGGLE_LOADER: "TOGGLE_LOADER"
};

export function loadJobListing(data) {
  return {
    type: actionTypes.LOAD_JOBLISTING,
    data
  };
}
export function loadJobListingSuccess(data) {
  return {
    type: actionTypes.LOAD_JOBLISTING_SUCCESS,
    data
  };
}
export function toggleLoader(data) {
  return {
    type: actionTypes.TOGGLE_LOADER,
    data
  };
}
export function clearAll() {
  return {
    type: actionTypes.CLEARALL
  };
}

export function saveJobListingSuccess(data) {
  return {
    type: actionTypes.SAVE_JOBLISTING_SUCCESS,
    data
  };
}

export function saveJobListingError(data) {
  return {
    type: actionTypes.SAVE_JOBLISTING_FAILURE,
    data
  };
}

export function saveJobListing(data) {
  return {
    type: actionTypes.SAVE_JOBLISTING,
    data
  };
}

export function saveCandidatesSuccess(data) {
  return {
    type: actionTypes.SAVE_CANDIDATE_SUCCESS,
    data
  };
}

export function saveCandidates(data) {
  return {
    type: actionTypes.SAVE_CANDIDATE,
    data
  };
}

export function saveCandidatesError(data) {
  return {
    type: actionTypes.SAVE_CANDIDATE_FAILURE,
    data
  };
}
export function setSelectedCandidate(data) {
  return {
    type: actionTypes.SELECTED_CANDIDATE,
    data
  };
}
export function addCandidateSave(data) {
  return { type: actionTypes.ADD_CANDIDATE_SAVE, data };
}

export function loadCandidates(data) {
  return { type: actionTypes.LOAD_CANDIDATES, data };
}

export function loadCandidatesSuccess(data) {
  return {
    type: actionTypes.LOAD_CANDIDATES_SUCCESS,
    data
  };
}

export function failure(error) {
  return {
    type: actionTypes.FAILURE,
    error
  };
}

export function addFilterCriteria(data) {
  return {
    type: actionTypes.ADD_FILTER_CRITERIA,
    data
  };
}
