import * as auth from '../actions/auth'

const initialState = {
    access: undefined,
    refresh: undefined,
    errors: {},
    is_admin: undefined,
    signup: false
};
export default (state = initialState, action) => {
    switch (action.type) {
        case auth.LOGIN_SUCCESS:
            return {
                access: {
                    token: action.payload.access_token,
                },
                refresh: {
                    token: action.payload.refresh_token,
                },
                errors: {},
                is_admin: action.payload.is_admin
            };
        case auth.TOKEN_RECEIVED:
            return {
                ...state,
                access: {
                    token: action.payload.access_token,
                }
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
        case auth.VERIFY_EMAIL_SUCCESS:
        case auth.VERIFY_EMAIL_FAILURE:
        case auth.SIGN_UP_SUCCESS:
            return {signup: true};
        case auth.SIGN_UP_FAILURE:
        default:
            return state
    }
}

export function isAdmin(state) {
    return !!state.is_admin;
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
    if (state.access && state.access.exp) {
        return 1000 * state.access.exp - (new Date()).getTime() < 5000
    }
    return true
}

export function isRefreshTokenExpired(state) {
    if (state.refresh && state.refresh.exp) {
        return 1000 * state.refresh.exp - (new Date()).getTime() < 5000
    }
    return false
}

/*
export function isAuthenticated(state) {
    return !isRefreshTokenExpired(state)
}
*/

export function isAuthenticated(state) {
    console.log("El valor es: ", state.access);
    return state.access !== undefined;
}

export function errors(state) {
    return state.errors
}