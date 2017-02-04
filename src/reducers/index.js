import { combineReducers } from 'redux';
import quizReducer from './quizReducer';
import authReducer from './authReducer';
import lessonReducer from './lessonReducer';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  quizReducer,
  authReducer,
  lessonReducer,
  routing: routerReducer
});

export default rootReducer;
