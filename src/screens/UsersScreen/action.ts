import { FETCH_DATA } from "./actionTypes";
import api from "../../api/api";
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from '../../../store/reducers/index'; 


type FetchDataType = {
    type: string; 
    payload: any;
  }
  
  export const fetchData = (): ThunkAction<void, RootState, unknown, FetchDataType> => async (dispatch: Dispatch<FetchDataType>) => {
    try {
      const data = await getUsers();
      dispatch({ type: FETCH_DATA, payload: data });
    } catch (error) {
    }
  };

const getUsers = async (results: number = 10) => {
  try {
    const response = await api.get(`/?results=${results}`);
    return response.data;
  } catch (error) {
    return error;
  }
};
