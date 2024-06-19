import {
  FETCH_BANNER_DETAILS,
  FETCH_BANNER_DETAILS_FAILURE,
  FETCH_BANNER_DETAILS_REQUEST,
} from './actionTypes';

interface BannerData {
  bannerData: any;
  isLoading: boolean;
  error: string | null;
}

const initialState: BannerData = {
  bannerData: [],
  isLoading: false,
  error: null,
};

const bannerDataReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_BANNER_DETAILS_REQUEST:
      return {...state, isLoading: true, error: null};
    case FETCH_BANNER_DETAILS:
      return {...state, bannerData: action.payload, isLoading: false};
    case FETCH_BANNER_DETAILS_FAILURE:
      console.log('reducer', action.payload.error);
      return {
        ...state,
        bannerData: [],
        isLoading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default bannerDataReducer;
