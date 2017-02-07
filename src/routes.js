import React from 'react';
import { Route, IndexRoute } from 'react-router';

import AppContainer from './containers/AppContainer';
import HomePage from './components/HomePage';
import QuizPage from './containers/QuizPage'; // eslint-disable-line import/no-named-as-default
import LessonsPage from './containers/LessonsPage';

export default (
  <Route path="/" component={AppContainer}>
    <IndexRoute component={HomePage}/>
    <Route path="quiz" component={QuizPage}/>
    <Route path="lessons" component={LessonsPage}/>
  </Route>
);
