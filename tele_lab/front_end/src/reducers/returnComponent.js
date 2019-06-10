import * as returnComponent from '../actions/returnComponent'
import _ from 'lodash'

const initialState = {
  pendingLoans: undefined,
  componentsLoan: undefined,
  stateItem: 0,
  countReturnedComponents: 0
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
        stateItem: action.payload
      };
    case returnComponent.END_LOAN:
      //let returnedComponents = countInitialReturnedComponents(state.componentsLoan);
      //console.log(returnedComponents);
      console.log(action.payload);
      console.log(state.componentsLoan);
      return {
        ...state,
        componentsLoan: _.set(state.componentsLoan, 'state', action.payload.state),
      };
    default:
      return state
  }
}

const changeStateComponent = (listComponents) => {
  listComponents.forEach((component => {

    list.push(_.set(component, 'state', action.payload.state))
  }))
};

const countInitialReturnedComponents = (componentsLoan) => {
  return _.countBy(componentsLoan, (val) => {
    return val.state === 0
  });
  //return _.filter(componentsLoan, (val) => {return val.state === 1}).length

};