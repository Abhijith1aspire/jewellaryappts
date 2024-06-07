import { FETCH_BANNER_DETAILS } from "./actionTypes";
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from '../../store/rootreducers/index'; 
import axios from "axios";

type FetchDataType = {
  type: string; 
  payload: any;
}

export const fetchData = (): ThunkAction<void, RootState, unknown, FetchDataType> => (dispatch: Dispatch<FetchDataType>) => {
  getBannerDetails()
    .then(data => {
      dispatch({ type: FETCH_BANNER_DETAILS, payload: data });
    })
    .catch(error => {
      console.error(error);
    });
};

const getBannerDetails = () => {
  const data = JSON.stringify({
    query: `query GetTemplateList {
      getTemplateList(identifier: "home_page") {
          identifier
          items {
              backgroundColor
              backgroundImage
              heroBanner
              sortOrder
              title
              type
              additionalFields {
                  content
                  image
                  link
                  linkText
                  subtitle
                  title
              }
          }
      }
  }`,
    variables: {}
  });

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://qa.grtjewels.com/graphql',
    headers: {
      'Content-Type': 'application/json',
    },
    data : data
  };

  return axios.request(config)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error);
      throw error; 
    });
};
