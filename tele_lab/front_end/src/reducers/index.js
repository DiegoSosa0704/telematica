import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import auth, * as fromAuth from './auth'
import academicProgram from './academicProgram'
import loan from './loan'
import returnComponent from './returnComponent'

export default combineReducers({
  auth: auth,
  academicProgram: academicProgram,
  loan: loan,
  returnComponent: returnComponent,
  router: routerReducer
})

export const isAuthenticated = state => fromAuth.isAuthenticated(state.auth);
export const accessToken = state => fromAuth.accessToken(state.auth);
export const isAccessTokenExpired = state => fromAuth.isAccessTokenExpired(state.auth);
export const refreshToken = state => fromAuth.refreshToken(state.auth);
export const authErrors = state => fromAuth.errors(state.auth);

export function withAuth(headers = {}) {
  return (state) => ({
    ...headers,
    'Authorization': `Bearer ${accessToken(state)}`
  })
}
