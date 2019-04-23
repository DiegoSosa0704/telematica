import * as loan from '../actions/loan'
import * as auth from "../actions/auth";

const initialState = {
  users: undefined,
  userLoan: {},
  components: [],
  listComponents: [],
  countComponents: 0,
  lastQuery: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
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
    case loan.ADD_COMPONENT_TO_LOAN:
      // Agregar datos a una lista
      return {
        ...state,
        components: [...state.components, action.payload],
      };
    case loan.REMOVE_COMPONENT_TO_LOAN:
      return {
        ...state,
        components: state.components.filter((item) => item.id !== action.payload.id)
      };
    case loan.LIST_COMPONENTS_SUCCESS:
      return {
        ...state,
        listComponents: action.payload.components,
        countComponents: action.payload.totalCount
      };
    case loan.LIST_COMPONENTS_FAILURE:
    case loan.COUNT_COMPONENTS_SUCCESS:
      return {
        ...state,
        countComponents: action.payload
      };
    case loan.COUNT_COMPONENTS_FAILURE:
    case loan.SAVE_LAST_QUERY:
      return {
        ...state,
        lastQuery: action.payload
      };
    case auth.LOGOUT_SUCCESSFUL:
      return initialState;
    case loan.CREATE_LOAN_SUCCESS:
      return {
        ...state,
        userLoan: {},
        components: []
      };
    case loan.CREATE_LOAN_FAILURE:
    default:
      return state
  }
}