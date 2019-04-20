import * as auth from '../actions/academicProgram'

const initialState = {
  academic_programs: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case auth.GET_ACADEMIC_PROGRAMS_SUCCESS:
      return {
        academic_programs: action.payload
      };
    case auth.GET_ACADEMIC_PROGRAMS_FAILURE:
    default:
      return state
  }
}