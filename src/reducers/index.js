import { combineReducers } from 'redux';
import quizReducer from './quizReducer';
import authReducer from './authReducer';
import lessonReducer from './lessonReducer';
import {routerReducer} from 'react-router-redux';

//combines reducers into single redux store
const rootReducer = combineReducers({
  quizReducer,
  authReducer,
  lessonReducer,
  routing: routerReducer
});

export default rootReducer;
