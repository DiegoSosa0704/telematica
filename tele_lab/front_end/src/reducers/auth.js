import * as auth from '../actions/auth'

function convertExp(seconds) {
  return (seconds * 1000) + (new Date()).getTime()
}

const initialState = {
  access: undefined,
  refresh: undefined,
  errors: {},
  signup: false,
  is_admin: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case auth.LOGIN_SUCCESS:
      return {
        access: {
          token: action.payload.access_token,
          expires_in: convertExp(action.payload.expires_in),
          token_type: action.payload.token_type,
          scope: action.payload.scope
        },
        refresh: {
          token: action.payload.refresh_token,
        },
        is_admin: action.payload.is_admin,
        errors: {},
      };
    case auth.TOKEN_RECEIVED:
      return {
        ...state,
        access: {
          token: action.payload.access_token,
          expires_in: convertExp(action.payload.expires_in),
          token_type: action.payload.token_type,
          scope: action.payload.scope
        },
        refresh: {
          token: action.payload.refresh_token,
        },
        is_admin: action.payload.is_admin,
      };
    case auth.LOGIN_FAILURE:
    case auth.TOKEN_FAILURE:
      return {
        access: undefined,
        refresh: undefined,
        errors:
          action.payload.response ||
          {'non_field_errors': action.payload.statusText},
      };
    case auth.LOGOUT_SUCCESSFUL:
      return {};
    case auth.VERIFY_EMAIL_REQUEST:
    case auth.VERIFY_EMAIL_SUCCESS:
      return {
        ...state
      };
    case auth.VERIFY_EMAIL_FAILURE:
      return {
        ...state
      };
    case auth.SIGN_UP_SUCCESS:
      return {signup: true};
    case auth.SIGN_UP_FAILURE:
    case auth.ROLE_USER_SUCCESS:
      return {
        ...state,
        is_admin: action.payload.is_admin
      };
    case auth.ROLE_USER_FAILURE:
    case auth.GET_USER_REQUEST:
    case auth.GET_USER_SUCCESS:
    case auth.GET_USER_FAILURE:
    default:
      return state
  }
}

export function accessToken(state) {
  if (state.access) {
    return state.access.token
  }
}

export function refreshToken(state) {
  if (state.refresh) {
    return state.refresh.token
  }
}

export function isAccessTokenExpired(state) {
  if (state.access && state.access.expires_in) {
    return state.access.expires_in - (new Date()).getTime() < 10000
  }
  return true
}

export function isAuthenticated(state) {
  return !isAccessTokenExpired(state)
}

export function errors(state) {
  return state.errors
}