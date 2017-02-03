import * as types from '../constants/actionTypes';

const initialState = {
  lessons: [],
  selectedPdf: {}
};

export default function lessonReducer(state = initialState, action) {
  switch(action.type) {
    case types.GET_LESSONS:
      return {
        ...state,
        lessons: action.lessons
      };
    case types.GET_PDF:
    console.log('reducer response: ',action.response);
      return {
        ...state,
        selectedPdf: action.response.selectedPdf
      }
    default:
    return state;
  }
}
