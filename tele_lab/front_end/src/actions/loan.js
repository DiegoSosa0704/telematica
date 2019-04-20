import {RSAA} from "redux-api-middleware";
import {withAuth} from "../reducers";

export const GET_USERS_REQUEST = '@@loan/GET_USERS_REQUEST';
export const GET_USERS_SUCCESS = '@@loan/GET_USERS_SUCCESS';
export const GET_USERS_FAILURE = '@@loan/GET_USERS_FAILURE';
export const GET_USERS_LOAN = '@@loan/GET_USERS_LOAN';
export const ADD_COMPONENT_TO_LOAN = '@@loan/ADD_COMPONENT_TO_LOAN';
export const REMOVE_COMPONENT_TO_LOAN = '@@loan/REMOVE_COMPONENT_TO_LOAN';
export const LIST_COMPONENTS_REQUEST = '@@loan/LIST_COMPONENTS_REQUEST';
export const LIST_COMPONENTS_SUCCESS = '@@loan/LIST_COMPONENTS_SUCCESS';
export const LIST_COMPONENTS_FAILURE = '@@loan/LIST_COMPONENTS_FAILURE';

export const COUNT_COMPONENTS_REQUEST = '@@loan/COUNT_COMPONENTS_REQUEST';
export const COUNT_COMPONENTS_SUCCESS = '@@loan/COUNT_COMPONENTS_SUCCESS';
export const COUNT_COMPONENTS_FAILURE = '@@loan/COUNT_COMPONENTS_FAILURE';
export const SAVE_LAST_QUERY = '@@loan/SAVE_LAST_QUERY';


export const getListUsers = () => ({
  [RSAA]: {
    endpoint: '/api/v1/user/',
    method: 'GET',
    headers: withAuth({'Content-Type': 'application/json'}),
    types: [
      GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USERS_FAILURE
    ]
  }
});

export const getDataUserLoan = (dataUser) => {
  return {
    type: GET_USERS_LOAN,
    payload: dataUser
  };
};

export const addToLoan = (component) => {
  return {
    type: ADD_COMPONENT_TO_LOAN,
    payload: component
  };
};

export const removeToLoan = (component) => {
  return {
    type: REMOVE_COMPONENT_TO_LOAN,
    payload: component
  }
};

export const listComponents = (query, post) => ({
  [RSAA]: {
    endpoint: `/api/v1/components/search?${query}`,
    method: 'POST',
    body: JSON.stringify({
      components: post
    }),
    headers: withAuth({'Content-Type': 'application/json'}),
    types: [
      LIST_COMPONENTS_REQUEST, LIST_COMPONENTS_SUCCESS, LIST_COMPONENTS_FAILURE
    ]
  }
});

export const countComponents = (query, post) => ({
  [RSAA]: {
    endpoint: `/api/v1/components/search?${query}`,
    method: 'POST',
    body: JSON.stringify({
      components: post
    }),
    headers: withAuth({'Content-Type': 'application/json'}),
    types: [
      COUNT_COMPONENTS_REQUEST, COUNT_COMPONENTS_SUCCESS, COUNT_COMPONENTS_FAILURE
    ]
  }
});

export const lastQuery = (query) => {
  return {
    type: SAVE_LAST_QUERY,
    payload: query
  }
};