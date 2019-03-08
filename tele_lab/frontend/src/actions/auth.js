import {RSAA} from 'redux-api-middleware';

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


export const login = (username, password) => ({
    [RSAA]: {
        endpoint: '/api/v1/login/',
        method: 'POST',
        body: JSON.stringify({
            client_id: "uaP4l30ijsGfx6lOjnvStPKVwXFNGBI0WRwLVRXF",
            client_secret: "dxjBD5PMXamAuuzZC7WlNC6i0vaYrJSCRbyccd6lXvttmVJCFoI9pSb4Kz7wwnPvcFKQH5D88IGvpeAqqGIYCSNkbsG4AppfCmVoO2pZDqID2yMRjekGqVf24fM2wbs8",
            grant_type: "password",
            username: username,
            password: password
        }),
        headers: {'Content-Type': 'application/json'},
        types: [
            LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
        ]
    }
});

export const signUp = (states) => ({
    [RSAA]: {
        endpoint: '/api/v1/user/',
        method: 'POST',
        body: JSON.stringify({
            email: states.email,
            first_name: states.first_name,
            last_name: states.last_name,
            password: states.password,
        }),
        headers: {'Content-Type': 'application/json'},
        types: [
            SIGN_UP_SUCCESS, SIGN_UP_REQUEST, SIGN_UP_FAILURE
        ]
    }
});

/*
export const login = (username, password) => ({
    [RSAA]: {
        endpoint: '/api/auth/token/obtain/',
        method: 'POST',
        body: JSON.stringify({username, password}),
        headers: {'Content-Type': 'application/json'},
        types: [
            LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE
        ]
    }
});*/

export const refreshAccessToken = (token) => ({
    [RSAA]: {
        endpoint: '/api/auth/token/refresh/',
        method: 'POST',
        body: JSON.stringify({refresh: token}),
        headers: {'Content-Type': 'application/json'},
        types: [
            TOKEN_REQUEST, TOKEN_RECEIVED, TOKEN_FAILURE
        ]
    }
});

export const verifyEmail = (token) => ({
    [RSAA]: {
        endpoint: '/api/v1/user/verify_email/',
        method: 'POST',
        body: JSON.stringify({token: token}),
        headers: {'Content-Type': 'application/json'},
        types: [
            VERIFY_EMAIL_REQUEST, VERIFY_EMAIL_SUCCESS, VERIFY_EMAIL_FAILURE
        ]
    }
});