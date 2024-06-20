import { FETCH_PLP_DETAILS, FETCH_PLP_DETAILS_FAILURE, FETCH_PLP_DETAILS_REQUEST } from './actionTypes';

interface Action {
  type: string;
  payload?: any;
}

interface PLPProductData {
  productData: any[];
  isLoading: boolean;
  error: string | null;
}

const initialState: PLPProductData = {
  productData: [],
  isLoading: false,
  error: null,
};

const plpDataReducer = (state = initialState, action: Action): PLPProductData => {
  switch (action.type) {
    case FETCH_PLP_DETAILS_REQUEST:
      return { ...state, isLoading: true, error: null };
    case FETCH_PLP_DETAILS:
      return { ...state, productData: action.payload, isLoading: false };
    case FETCH_PLP_DETAILS_FAILURE:
      console.error('Reducer error:', action.payload.error);
      return { ...state, productData: [], isLoading: false, error: action.payload.error };
    default:
      return state;
  }
};

export default plpDataReducer;
