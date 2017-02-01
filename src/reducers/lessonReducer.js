import * as types from '../constants/actionTypes';

const initialState = {
  lessons: []
};

export default function lessonReducer(state = initialState, action) {
  switch(action.type) {
    case types.GET_LESSONS:
      return {
        ...state,
        lessons: action.lessons
      };
    default:
    return state;
  }
}
