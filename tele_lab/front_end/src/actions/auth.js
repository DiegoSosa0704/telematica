import {RSAA} from 'redux-api-middleware';
import {withAuth} from "../reducers";

export const LOGIN_REQUEST = '@@auth/LOGIN_REQUEST';
export const LOGIN_SUCCESS = '@@auth/LOGIN_SUCCESS';
export const LOGIN_FAILURE = '@@auth/LOGIN_FAILURE';
export const TOKEN_REQUEST = '@@auth/TOKEN_REQUEST';
export const TOKEN_RECEIVED = '@@auth/TOKEN_RECEIVED';
export const TOKEN_FAILURE = '@@auth/TOKEN_FAILURE';
export const LOGOUT_SUCCESSFUL = '@@auth/LOGOUT_SUCCESSFUL';

export const VERIFY_EMAIL_REQUEST = '@@auth/VERIFY_EMAIL_REQUEST';
export const VERIFY_EMAIL_SUCCESS = '@@auth/VERIFY_EMAIL_SUCCESS';
export const VERIFY_EMAIL_FAILURE = '@@auth/VERIFY_EMAIL_FAILURE';

export const SIGN_UP_REQUEST = '@@auth/SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = '@@auth/SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = '@@auth/SIGN_UP_FAILURE';

export const ROLE_USER_REQUEST = '@@auth/ROLE_USER_REQUEST';
export const ROLE_USER_SUCCESS = '@@auth/ROLE_USER_SUCCESS';
export const ROLE_USER_FAILURE = '@@auth/ROLE_USER_FAILURE';

export const GET_USER_REQUEST = '@@auth/GET_USER_REQUEST';
export const GET_USER_SUCCESS = '@@auth/GET_USER_SUCCESS';
export const GET_USER_FAILURE = '@@auth/GET_USER_FAILURE';



const client_id = "qJhgMQxAnr41MmOfjh33JvBkPWGsDIxK081YIaSI";
const client_secret = "HXExZREtOWO0FakEcPa7oThTPMZMdeZa7dKwbFfbROzzWzJB7m0AW1LE36XeDKevRDUjUxCRezyMoe6Tv1KlWwRAjZxLi9moUtzyZFvgXA79VmatW8f20N814H1MZVMr";


export const login = (username, password, token) => ({
  [RSAA]: {
    endpoint: '/api/v1/get_token/',
    method: 'POST',
    body: JSON.stringify({
      client_id: client_id,
      client_secret: client_secret,
      grant_type: "password",
      username: username,
      password: password
    }),
    headers: {'Content-Type': 'application/json', 'X-CSRFToken': token},
    types: [
      LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
    ]
  }
});

export const signUp = (states) => ({
  [RSAA]: {
    endpoint: '/api/v1/user/registry/create_user/',
    method: 'POST',
    body: JSON.stringify({
      first_name: states.first_name,
      last_name: states.last_name,
      code: states.code,
      type: states.type,
      academic_program: states.academic_program,
      email: states.email,
      password: states.password,
    }),
    headers: {'Content-Type': 'application/json'},
    types: [
      SIGN_UP_SUCCESS, SIGN_UP_REQUEST, SIGN_UP_FAILURE
    ]
  }
});

export const refreshAccessToken = (token) => ({
  [RSAA]: {
    endpoint: '/api/v1/get_token/',
    method: 'POST',
    body: JSON.stringify({
      client_id: client_id,
      client_secret: client_secret,
      grant_type: "refresh_token",
      refresh_token: token,
    }),
    headers: withAuth({'Content-Type': 'application/json'}),
    types: [
      TOKEN_REQUEST, TOKEN_RECEIVED, TOKEN_FAILURE
    ]
  }
});

export const verifyEmail = (token) => ({
  [RSAA]: {
    endpoint: '/api/v1/user/registry/verify_email/',
    method: 'POST',
    body: JSON.stringify({token: token}),
    headers: {'Content-Type': 'application/json'},
    types: [
      VERIFY_EMAIL_REQUEST, VERIFY_EMAIL_SUCCESS, VERIFY_EMAIL_FAILURE
    ]
  }
});


export const is_admin = (token) => ({
  [RSAA]: {
    endpoint: `/api/v1/is_admin/${token}`,
    method: 'GET',
    headers: withAuth({'Content-Type': 'application/json'}),
    types: [
      ROLE_USER_REQUEST, ROLE_USER_SUCCESS, ROLE_USER_FAILURE
    ]
  }
});


