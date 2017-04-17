import * as types from '../constants/actionTypes';

//initialize lessonReducer state
const initialState = {
  lessons: [],
  selectedPdf: {}
};

export {initialState};

//define lessonReducer
export default function lessonReducer(state = initialState, action) {

  //switch block to define behavior for each case
  switch(action.type) {

    //updates state with list of course lessons
    //called upon success of getLessons fetch request
    case types.GET_LESSONS:
      return {
        ...state,
        lessons: action.lessons
      };

    //updates state with selectedPdf preview (url), download (url), name and id
    //called upon start and success of getPDF fetch request via loadPreview (first call clears selectedPdf info, allowing UI display effect)
    case types.GET_PDF:
      return {
        ...state,
        selectedPdf: action.selectedPdf
      }
    default:
    return state;
  }
}
