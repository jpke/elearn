import { combineReducers } from 'redux';
import quizReducer from './quizReducer';
import authReducer from './authReducer';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  quizReducer,
  authReducer,
  routing: routerReducer
});

export default rootReducer;
