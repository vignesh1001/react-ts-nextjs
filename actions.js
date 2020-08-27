export const actionTypes = {
  ADD_CANDIDATE_SAVE: "ADD_CANDIDATE_SAVE",
  SAVE_CANDIDATE: "SAVE_CANDIDATE",
  SAVE_CANDIDATE_SUCCESS: "SAVE_CANDIDATE_SUCCESS",
  SAVE_CANDIDATE_FAILURE: "SAVE_CANDIDATE_FAILURE",
  SAVE_JOBLISTING: "SAVE_JOBLISTING",
  SAVE_JOBLISTING_SUCCESS: "SAVE_JOBLISTING_SUCCESS",
  SAVE_JOBLISTING_FAILURE: "SAVE_JOBLISTING_FAILURE",
  LOAD_CANDIDATES: "LOAD_CANDIDATES",
  LOAD_CANDIDATES_SUCCESS: "LOAD_CANDIDATES_SUCCESS",
  LOAD_RESUMES: "LOAD_RESUMES",
  LOAD_RESUME_DATA_SUCCESS: "LOAD_RESUME_DATA_SUCCESS",
  UPDATE_RESUME_DATA: "UPDATE_RESUME_DATA",
  UI_TOGGLE_CANDIDATE_MODAL: "UI_TOGGLE_CANDIDATE_MODAL",
  ADD_FILTER_CRITERIA: "ADD_FILTER_CRITERIA",
  FAILURE: "FAILURE",
  LOAD_JOBLISTING: "LOAD_JOBLISTING",
  LOAD_JOBLISTING_SUCCESS: "LOAD_JOBLISTING_SUCCESS"
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

export function loadResumes() {
  return { type: actionTypes.LOAD_RESUMES };
}

export function loadResumeDataSuccess(data) {
  return {
    type: actionTypes.LOAD_RESUME_DATA_SUCCESS,
    data
  };
}

export function uploadResumeData(data) {
  return {
    type: actionTypes.UPDATE_RESUME_DATA,
    data
  };
}

export function openCandidateModal() {
  return {
    type: actionTypes.UI_TOGGLE_CANDIDATE_MODAL
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
