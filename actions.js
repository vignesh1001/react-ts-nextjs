export const actionTypes = {
  LOAD_CANDIDATES: "LOAD_CANDIDATES",
  LOAD_CANDIDATES_SUCCESS: "LOAD_CANDIDATES_SUCCESS",
  LOAD_RESUMES: "LOAD_RESUMES",
  LOAD_RESUME_DATA_SUCCESS: "LOAD_RESUME_DATA_SUCCESS",
  UPDATE_RESUME_DATA: "UPDATE_RESUME_DATA",
  UI_TOGGLE_CANDIDATE_MODAL: "UI_TOGGLE_CANDIDATE_MODAL",
  ADD_FILTER_CRITERIA: "ADD_FILTER_CRITERIA",
  FAILURE: "FAILURE",
};

export function loadCandidates(data) {
  return { type: actionTypes.LOAD_CANDIDATES, data };
}

export function loadCandidatesSuccess(data) {
  return {
    type: actionTypes.LOAD_CANDIDATES_SUCCESS,
    data,
  };
}

export function loadResumes() {
  return { type: actionTypes.LOAD_RESUMES };
}

export function loadResumeDataSuccess(data) {
  return {
    type: actionTypes.LOAD_RESUME_DATA_SUCCESS,
    data,
  };
}

export function uploadResumeData(data) {
  return {
    type: actionTypes.UPDATE_RESUME_DATA,
    data,
  };
}

export function openCandidateModal() {
  return {
    type: actionTypes.UI_TOGGLE_CANDIDATE_MODAL,
  };
}

export function failure(error) {
  return {
    type: actionTypes.FAILURE,
    error,
  };
}

export function addFilterCriteria(data) {
  return {
    type: actionTypes.ADD_FILTER_CRITERIA,
    data,
  };
}
