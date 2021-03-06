import {RSAA} from "redux-api-middleware";
import {withAuth} from "../reducers";

export const GET_PENDING_LOANS_REQUEST = '@@returnComponent/GET_PENDING_LOANS_REQUEST';
export const GET_PENDING_LOANS_SUCCESS = '@@returnComponent/GET_PENDING_LOANS_SUCCESS';
export const GET_PENDING_LOANS_FAILURE = '@@returnComponent/GET_PENDING_LOANS_FAILURE';

export const GET_COMPONENTS_REQUEST = '@@returnComponent/GET_COMPONENTS_REQUEST';
export const GET_COMPONENTS_SUCCESS = '@@returnComponent/GET_COMPONENTS_SUCCESS';
export const GET_COMPONENTS_FAILURE = '@@returnComponent/GET_COMPONENTS_FAILURE';

export const PATCH_LOAN_COMPONENT_REQUEST = '@@returnComponent/PATCH_LOAN_COMPONENT_REQUEST';
export const PATCH_LOAN_COMPONENT_SUCCESS = '@@returnComponent/PATCH_LOAN_COMPONENT_SUCCESS';
export const PATCH_LOAN_COMPONENT_FAILURE = '@@returnComponent/PATCH_LOAN_COMPONENT_FAILURE';

export const STATE_ITEM_LIST = '@@returnComponent/STATE_ITEM_LIST';

export const END_LOAN = '@@returnComponent/END_LOAN';
export const CHANGE_END_LOAN = '@@returnComponent/CHANGE_END_LOAN';

export const GET_LOANS_REQUEST = '@@returnComponent/GET_LOANS_REQUEST';
export const GET_LOANS_SUCCESS = '@@returnComponent/GET_LOANS_SUCCESS';
export const GET_LOANS_FAILURE = '@@returnComponent/GET_LOANS_FAILURE';

export const GET_RESET_LOANS_REQUEST = '@@returnComponent/GET_RESET_LOANS_REQUEST';
export const GET_RESET_LOANS_SUCCESS = '@@returnComponent/GET_RESET_LOANS_SUCCESS';
export const GET_RESET_LOANS_FAILURE = '@@returnComponent/GET_RESET_LOANS_FAILURE';


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

export const changeStateLoanComponent = (loanComponentId, state) => ({
  [RSAA]: {
    endpoint: `/api/v1/loan/component/update/${loanComponentId}/`,
    method: 'PATCH',
    body: JSON.stringify({
      state: state,
    }),
    headers: withAuth({'Content-Type': 'application/json'}),
    types: [
      PATCH_LOAN_COMPONENT_REQUEST, PATCH_LOAN_COMPONENT_SUCCESS, PATCH_LOAN_COMPONENT_FAILURE
    ]
  }
});

export const changeStateItemList = (indexItem) => {
  return {
    type: STATE_ITEM_LIST,
    payload: indexItem
  };
};

export const endLoan = (state, indexLastComponent) => {
  return {
    type: END_LOAN,
    payload: {
      state: state,
      indexLastComponent: indexLastComponent
    }
  };
};

export const changeEndLoan = (state) => {
  return {
    type: CHANGE_END_LOAN,
    payload: state
  }
};

export const getLoans = (query, resetList) => {
  if (resetList) {
    return {
      [RSAA]: {
        endpoint: `/api/v1/loan/search?${query}`,
        method: 'GET',
        headers: withAuth({'Content-Type': 'application/json'}),
        types: [
          GET_RESET_LOANS_REQUEST, GET_RESET_LOANS_SUCCESS, GET_RESET_LOANS_FAILURE
        ]
      }
    }
  } else {
    return {
      [RSAA]: {
        endpoint: `/api/v1/loan/search?${query}`,
        method: 'GET',
        headers: withAuth({'Content-Type': 'application/json'}),
        types: [
          GET_LOANS_REQUEST, GET_LOANS_SUCCESS, GET_LOANS_FAILURE
        ]
      }
    }
  }
};