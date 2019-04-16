import * as loan from '../actions/loan'

const initialState = {
  users: undefined,
  userLoan: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case loan.GET_USERS_REQUEST:
    case loan.GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };
    case loan.GET_USERS_FAILURE:
    case loan.GET_USERS_LOAN:
      return {
        ...state,
        userLoan: action.payload,
      };
    default:
      return state
  }
}