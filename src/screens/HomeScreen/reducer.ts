import { FETCH_BANNER_DETAILS } from './actionTypes'

interface bannerData {
  bannerData: any;
}

const initialState: bannerData = {
  bannerData: [],
};

const bannerDataReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_BANNER_DETAILS:
      return { ...state, bannerData: action.payload };
    default:
      return state;
  }
};

export default bannerDataReducer;
