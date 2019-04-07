import {RSAA} from "redux-api-middleware";
import {withAuth} from "../reducers";

export const GET_ACADEMIC_PROGRAMS_REQUEST = '@@auth/GET_ACADEMIC_PROGRAMS_REQUEST';
export const GET_ACADEMIC_PROGRAMS_SUCCESS = '@@auth/GET_ACADEMIC_PROGRAMS_SUCCESS';
export const GET_ACADEMIC_PROGRAMS_FAILURE = '@@auth/GET_ACADEMIC_PROGRAMS_FAILURE';

export const getAcademicPrograms = () => ({
  [RSAA]: {
    endpoint: '/api/v1/academic_program/',
    method: 'GET',
    headers: withAuth({'Content-Type': 'application/json'}),
    types: [
      GET_ACADEMIC_PROGRAMS_REQUEST, GET_ACADEMIC_PROGRAMS_SUCCESS, GET_ACADEMIC_PROGRAMS_FAILURE
    ]
  }
});