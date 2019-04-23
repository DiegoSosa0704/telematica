import * as returnComponent from '../actions/returnComponent'

const initialState = {
  userLoan: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case returnComponent.TEST:
      console.log("test");
      return state;
    default:
      return state
  }
}