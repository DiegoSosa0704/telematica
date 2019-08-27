import * as returnComponent from '../actions/returnComponent'
import _ from 'lodash'

const initialState = {
  pendingLoans: undefined,
  componentsLoan: undefined,
  stateItem: 0,
  endLoan: false,
  loans: [],
  loansTotalCount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case returnComponent.GET_PENDING_LOANS_SUCCESS:
      return {
        ...state,
        pendingLoans: action.payload,
        componentsLoan: undefined
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
    case returnComponent.PATCH_LOAN_COMPONENT_SUCCESS:
      return state;
    case returnComponent.PATCH_LOAN_COMPONENT_FAILURE:
      return state;
    case returnComponent.STATE_ITEM_LIST:
      return {
        ...state,
        stateItem: action.payload
      };
    case returnComponent.END_LOAN:
      const newState = changeStateComponent(state.componentsLoan, action.payload);
      const returnedComponents = countReturnedComponents(newState);
      const endLoan = state.componentsLoan.length === returnedComponents.true;
      return {
        ...state,
        componentsLoan: newState,
        endLoan: endLoan,
        indexLastComponent: action.payload.indexLastComponent
      };
    case returnComponent.CHANGE_END_LOAN:
      return  {
        ...state,
        endLoan: action.payload
      };
    case returnComponent.GET_LOANS_SUCCESS:
      return {
        ...state,
        loansTotalCount: action.payload.totalCount,
        loans: _.union(state.loans, action.payload.loans)
      };
    case returnComponent.GET_RESET_LOANS_SUCCESS:
      return {
        ...state,
        loansTotalCount: action.payload.totalCount,
        loans: action.payload.loans
      };
    default:
      return state
  }
}

const changeStateComponent = (listComponents, payload) => {
  let list = [];
  listComponents.forEach(((component, index) => {
    if (index === payload.indexLastComponent) {
      list.push(_.set(component, 'state', payload.state))
    } else {
      list.push(component);
    }
  }));
  return list;
};

const countReturnedComponents = (componentsLoan) => {
  return _.countBy(componentsLoan, (val) => {
    return val.state === 1
  });
};