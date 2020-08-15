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
  addCandidate: {}
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

    case actionTypes.UPDATE_RESUME_DATA:
      return {
        ...state,
        ...{ resumes: [...state.resumes, action.data] }
      };

    case actionTypes.LOAD_RESUME_DATA_SUCCESS:
      return {
        ...state,
        ...{ resumes: action.data }
      };

    case actionTypes.UI_TOGGLE_CANDIDATE_MODAL:
      return {
        ...state,
        ...{ candidateModalOpen: !state.candidateModalOpen }
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
        addCandidate: action.data
      };
    case actionTypes.SAVE_CANDIDATE_SUCCESS:
      return {
        ...state,
        saveCandidateStatus: "SAVED",
        saveCandidateResponse: action.data
      };
    case actionTypes.SAVE_CANDIDATE_FAILURE:
      return {
        ...state,
        saveCandidateStatus: "FAILED"
      };
    case actionTypes.SAVE_JOBLISTING_SUCCESS:
      return {
        ...state,
        saveJobListingStatus: "SAVED",
        saveCandidateResponse: action.data
      };
    case actionTypes.SAVE_JOBLISTING_FAILURE:
      return {
        ...state,
        saveJobListingStatus: "FAILED"
      };
    default:
      return state;
  }
}

export default reducer;
