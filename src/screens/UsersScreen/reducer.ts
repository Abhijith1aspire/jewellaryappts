import { FETCH_DATA } from './actionTypes'

interface userData {
  loading: boolean;
  userData: any;
}

const initialState: userData = {
  loading: false,
  userData: [],
};

const userDataReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_DATA:
      return { ...state, loading: false, userData: action.payload };
    default:
      return state;
  }
};

export default userDataReducer;
