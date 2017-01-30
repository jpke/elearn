import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import HomePage from './components/HomePage';
import QuizPage from './containers/QuizPage'; // eslint-disable-line import/no-named-as-default
import LessonsPage from './containers/LessonsPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="quiz" component={QuizPage}/>
    <Route path="lessons" component={LessonsPage}/>
  </Route>
);
