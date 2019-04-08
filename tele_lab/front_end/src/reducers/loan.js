import * as loan from '../actions/loan'

const initialState = {
  users: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case loan.GET_USERS_REQUEST:
    case loan.GET_USERS_SUCCESS:
      return {
        users: action.payload
      };
    case loan.GET_USERS_FAILURE:
    default:
      return state
  }
}