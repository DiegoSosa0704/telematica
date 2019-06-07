import * as returnComponent from '../actions/returnComponent'

const initialState = {
  pendingLoans: undefined,
  componentsLoan: undefined,
  stateItem: false
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
    case returnComponent.GET_COMPONENTS_SUCCESS:
      return {
        ...state,
        componentsLoan: action.payload
      };
    case returnComponent.GET_COMPONENTS_FAILURE:
      return state;
    case returnComponent.PATCH_LOAN_COMPONENT_REQUEST:
      return state;
    case returnComponent.PATCH_LOAN_COMPONENT_SUCCESS:
      return state;
    case returnComponent.PATCH_LOAN_COMPONENT_FAILURE:
      return state;
    case returnComponent.STATE_ITEM_LIST:
      return {
        ...state,
        stateItem: !action.payload
      };
    default:
      return state
  }
}