import * as loan from '../actions/loan'
import * as auth from "../actions/auth";
import toast from 'toasted-notes'

const initialState = {
  users: undefined,
  userLoan: {},
  components: [],
  listComponents: [],
  countComponents: 0,
  lastQuery: undefined,
  success: false,
  addComponentState: false,
  selectedComponent: undefined,
  statusModalSelectedComponent: false,
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
      return {
        ...state,
        components: [...state.components, action.payload],
      };
    case loan.REMOVE_COMPONENT_TO_LOAN:
      return {
        ...state,
        components: state.components.filter((item) => item.id !== action.payload.id)
      };
    case loan.LIST_COMPONENTS_REQUEST:
      return {
        ...state,
        addComponentState: true
      };
    case loan.LIST_COMPONENTS_SUCCESS:
      return {
        ...state,
        listComponents: action.payload.components,
        countComponents: action.payload.totalCount,
        addComponentState: false
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
      toast.notify("Préstamo realizado.", {
        position: "bottom-left"
      });
      return {
        ...state,
        userLoan: {},
        components: [],
      };
    case loan.CREATE_LOAN_FAILURE:
    case loan.SELECTED_COMPONENT_LOAN:
      return {
        ...state,
        selectedComponent: action.payload
      };
    case loan.STATUS_MODAL_SELECTED_COMPONENT:
      return {
        ...state,
        statusModalSelectedComponent: action.payload
      };
    default:
      return state
  }
}