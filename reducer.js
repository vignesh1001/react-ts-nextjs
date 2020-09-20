import { actionTypes } from "./actions";

export const exampleInitialState = {
  error: false,
  light: false,
  candidates: null,
  isLoading: false,
  resumes: null,
  candidateModalOpen: false,
  saveCandidateStatus: "",
  saveJobListingStatus: "",
  filterData: {
    filterTitle: "",
    filterSkill: ""
  },
  addCandidate: {},
  saveJobListingResponse: null,
  selectedCandidate: null
};

function reducer(state = exampleInitialState, action) {
  switch (action.type) {
    case actionTypes.LOAD_CANDIDATES:
      return {
        ...state,
        error: null,
        isLoading: true
      };

    case actionTypes.LOAD_CANDIDATES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        candidates: action.data
      };

    case actionTypes.FAILURE:
      return {
        ...state,
        isLoading: false,
        candidates: { error: action.error }
      };
    case actionTypes.ADD_FILTER_CRITERIA:
      return {
        ...state,
        ...{ filterData: action.data }
      };
    case actionTypes.ADD_CANDIDATE_SAVE:
      return {
        ...state,
        saveCandidateStatus: "",
        addCandidate: action.data,
        saveCandidateResponse: null
      };
    case actionTypes.SAVE_CANDIDATE:
      return {
        ...state,
        saveCandidateStatus: null
      };
    case actionTypes.SAVE_CANDIDATE_SUCCESS:
      return {
        ...state,
        saveCandidateStatus: "CANDIDATE_SAVED",
        saveCandidateResponse: action.data
      };
    case actionTypes.SAVE_CANDIDATE_FAILURE:
      return {
        ...state,
        saveCandidateStatus: "CANDIDATE_FAILED",
        saveCandidateResponse: { error: action.data }
      };
    case actionTypes.SAVE_JOBLISTING:
      return {
        ...state,
        saveJobListingStatus: null
      };
    case actionTypes.SAVE_JOBLISTING_SUCCESS:
      return {
        ...state,
        saveJobListingStatus: "SAVED",
        saveJobListingResponse: action.data
      };
    case actionTypes.SAVE_JOBLISTING_FAILURE:
      return {
        ...state,
        saveJobListingStatus: "FAILED",
        saveJobListingResponse: null
      };
    case actionTypes.CLEARALL:
      return {
        ...state,
        saveJobListingResponse: null,
        saveCandidateResponse: null,
        saveJobListingStatus: "",
        saveCandidateStatus: "",
        selectedCandidate: null
      };
    case actionTypes.SELECTED_CANDIDATE:
      return {
        ...state,
        selectedCandidate: JSON.parse(JSON.stringify(action.data))
      };
    case actionTypes.LOAD_JOBLISTING_SUCCESS:
      return {
        ...state,
        jobList: action.data.jobPosting,
        isLoading: false
      };
    case actionTypes.TOGGLE_LOADER:
      return {
        ...state,
        isLoading: !state.isLoading
      };
    default:
      return state;
  }
}

export default reducer;
