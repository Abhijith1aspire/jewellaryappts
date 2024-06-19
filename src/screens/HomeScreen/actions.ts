import {
  FETCH_BANNER_DETAILS,
  FETCH_BANNER_DETAILS_FAILURE,
  FETCH_BANNER_DETAILS_REQUEST,
} from './actionTypes';
import {Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {RootState} from '../../store/rootreducers/index';
import axios from 'axios';

type FetchDataType = {
  type: string;
  payload?: any;
};

export const fetchData =
  (): ThunkAction<void, RootState, unknown, FetchDataType> =>
  async (dispatch: Dispatch<FetchDataType>) => {
    dispatch({type: FETCH_BANNER_DETAILS_REQUEST});

    try {
      const data = await getBannerDetails();
      dispatch({type: FETCH_BANNER_DETAILS, payload: data});
    } catch (error) {
      console.error(error);
      dispatch({
        type: FETCH_BANNER_DETAILS_FAILURE,
        payload: {error: 'Something went wrong'},
      });
    }
  };

const getBannerDetails = async () => {
  const data = JSON.stringify({
    query: `query {
      getTemplateList(identifier: "home_page") {
        identifier
        items {
          title
          type
          sortOrder
          tabGroup
          tabTitle
          tabSortOrder
          cssClass
          link
          linkText
          backgroundImage
          backgroundColor
          heroBanner
          additionalFields {
            image
            title
            subtitle
            link
            linkText
            content
          }
          tabItems {
            tabTitle
            backgroundImage
            backgroundColor
            heroBanner
            tabSortOrder
            additionalFields {
              image
              title
              subtitle
              link
              linkText
              content
            }
          }
        }
      }
    }`,
    variables: {},
  });

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://qa.grtjewels.com/graphql',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
