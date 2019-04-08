import {RSAA} from "redux-api-middleware";
import {withAuth} from "../reducers";

export const GET_USERS_REQUEST = '@@auth/GET_USERS_REQUEST';
export const GET_USERS_SUCCESS = '@@auth/GET_USERS_SUCCESS';
export const GET_USERS_FAILURE = '@@auth/GET_USERS_FAILURE';

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