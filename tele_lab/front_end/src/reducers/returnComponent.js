import * as returnComponent from '../actions/returnComponent'

const initialState = {
  pendingLoans: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case returnComponent.GET_PENDING_LOANS_SUCCESS:
      return {
        ...state,
        pendingLoans: action.payload
      };
    case returnComponent.GET_PENDING_LOANS_FAILURE:
      return state;
    default:
      return state
  }
}