import { FETCH_PLP_DETAILS, FETCH_PLP_DETAILS_FAILURE, FETCH_PLP_DETAILS_REQUEST } from './actionTypes';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../store/rootreducers/index';
import axios from 'axios';

type FetchDataType = {
  type: string;
  payload?: any;
};

export const fetchPLPData = (): ThunkAction<void, RootState, unknown, FetchDataType> =>
  async (dispatch: Dispatch<FetchDataType>) => {
    dispatch({ type: FETCH_PLP_DETAILS_REQUEST });

    try {
      const data = await getProductList();
      dispatch({ type: FETCH_PLP_DETAILS, payload: data });
    } catch (error) {
      console.error(error);
      dispatch({
        type: FETCH_PLP_DETAILS_FAILURE,
        payload: { error: 'Something went wrong' },
      });
    }
  };

const getProductList = async () => {
  const config = {
    method: 'get',
    url: 'https://demo.grtjewels.com/rest/default/V1/products/lists',
    params: {
      'searchCriteria[pageSize]': 24,
      'searchCriteria[currentPage]': 1,
      'searchCriteria[filterGroups][0][filters][0][field]': 'status',
      'searchCriteria[filterGroups][0][filters][0][value]': 1,
      'searchCriteria[filterGroups][0][filters][0][condition_type]': 'eq',
      'searchCriteria[filterGroups][1][filters][0][field]': 'category_id',
      'searchCriteria[filterGroups][1][filters][0][value]': 59,
      'searchCriteria[filterGroups][1][filters][0][conditionType]': 'eq',
      'searchCriteria[filterGroups][2][filters][0][field]': 'visibility',
      'searchCriteria[filterGroups][2][filters][0][value]': 4,
      'searchCriteria[filterGroups][2][filters][0][conditionType]': 'eq'
    },
    headers: {
      'Content-Type': 'application/json'
    },
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
