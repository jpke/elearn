import { combineReducers } from 'redux';
import quizReducer from './quizReducer';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  quizReducer,
  routing: routerReducer
});

export default rootReducer;
