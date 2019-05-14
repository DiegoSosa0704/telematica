import {RSAA} from "redux-api-middleware";
import {withAuth} from "../reducers";

export const GET_PENDING_LOANS_REQUEST = '@@returnComponent/GET_PENDING_LOANS_REQUEST';
export const GET_PENDING_LOANS_SUCCESS = '@@returnComponent/GET_PENDING_LOANS_SUCCESS';
export const GET_PENDING_LOANS_FAILURE = '@@returnComponent/GET_PENDING_LOANS_FAILURE';

export const GET_COMPONENTS_REQUEST = '@@returnComponent/GET_COMPONENTS_REQUEST';
export const GET_COMPONENTS_SUCCESS = '@@returnComponent/GET_COMPONENTS_SUCCESS';
export const GET_COMPONENTS_FAILURE = '@@returnComponent/GET_COMPONENTS_FAILURE';

export const getPendingLoans = () => ({
  [RSAA]: {
    endpoint: '/api/v1/loan/pending/',
    method: 'GET',
    headers: withAuth({'Content-Type': 'application/json'}),
    types: [
      GET_PENDING_LOANS_REQUEST, GET_PENDING_LOANS_SUCCESS, GET_PENDING_LOANS_FAILURE
    ]
  }
});

export const getComponentsByPendingLoan = (loanId) => ({
  [RSAA]: {
    endpoint: `/api/v1/loan/components/${loanId}/`,
    method: 'GET',
    headers: withAuth({'Content-Type': 'application/json'}),
    types: [
      GET_COMPONENTS_REQUEST, GET_COMPONENTS_SUCCESS, GET_COMPONENTS_FAILURE
    ]
  }
});