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

export const CREATE_LOAN_REQUEST = '@@loan/CREATE_LOAN_REQUEST';
export const CREATE_LOAN_SUCCESS = '@@loan/CREATE_LOAN_SUCCESS';
export const CREATE_LOAN_FAILURE = '@@loan/CREATE_LOAN_FAILURE';

export const GET_STOCK_COMPONENTS_REQUEST = "@@loan/GET_STOCK_COMPONENTS";
export const GET_STOCK_COMPONENTS_SUCCESS = "@@loan/GET_STOCK_COMPONENTS";
export const GET_STOCK_COMPONENTS_FAILURE = "@@loan/GET_STOCK_COMPONENTS";

export const SELECTED_COMPONENT_LOAN = '@@loan/SELECTED_COMPONENT_LOAN';

export const STATUS_MODAL_SELECTED_COMPONENT = '@@loan/STATUS_MODAL_SELECTED_COMPONENT';

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
    endpoint: `/api/v1/loan/components/search?${query}`,
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

export const createLoan = (components, academicId, dateStart) => ({
  [RSAA]: {
    endpoint: '/api/v1/loan/create/',
    method: 'POST',
    body: JSON.stringify({
      components: components,
      academic: academicId,
      state_loan: 0,
      date_start: dateStart
    }),
    headers: withAuth({'Content-Type': 'application/json'}),
    types: [
      CREATE_LOAN_REQUEST, CREATE_LOAN_SUCCESS, CREATE_LOAN_FAILURE
    ]
  }
});

export const selectedComponentOnLoan = (component) => ({
  type: SELECTED_COMPONENT_LOAN,
  payload: component
});

export const statusModalSelectedComponent = (status) => ({
  type: STATUS_MODAL_SELECTED_COMPONENT,
  payload: status,
});

export const getStockComponents = (componentId) => ({
  [RSAA]: {
    endpoint: `/api/v1/loan/stock-components/${componentId}/`,
    method: 'GET',
    headers: withAuth({'Content-Type': 'application/json'}),
    types: [
      GET_STOCK_COMPONENTS_REQUEST, GET_STOCK_COMPONENTS_SUCCESS, GET_STOCK_COMPONENTS_FAILURE
    ]
  }
});