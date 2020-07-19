import { actionTypes } from "./actions";

export const exampleInitialState = {
  error: false,
  light: false,
  candidates: null,
  isLoading: false,
  resumes: null,
  candidateModalOpen: false,
  filterData: {
    filterTitle: "",
    filterSkill: "",
  },
};

function reducer(state = exampleInitialState, action) {
  switch (action.type) {
    case actionTypes.LOAD_CANDIDATES:
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    case actionTypes.LOAD_CANDIDATES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        ...{ candidates: action.data },
      };

    case actionTypes.UPDATE_RESUME_DATA:
      return {
        ...state,
        ...{ resumes: [...state.resumes, action.data] },
      };

    case actionTypes.LOAD_RESUME_DATA_SUCCESS:
      return {
        ...state,
        ...{ resumes: action.data },
      };

    case actionTypes.UI_TOGGLE_CANDIDATE_MODAL:
      return {
        ...state,
        ...{ candidateModalOpen: !state.candidateModalOpen },
      };

    case actionTypes.FAILURE:
      return {
        ...state,
        isLoading: false,
        candidates: null,
        ...{ error: action.error },
      };
    case actionTypes.ADD_FILTER_CRITERIA:
      return {
        ...state,
        ...{ filterData: action.data },
      };

    default:
      return state;
  }
}

export default reducer;
