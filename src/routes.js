import React from 'react';
import { Route, IndexRoute } from 'react-router';

import AppContainer from './containers/AppContainer';
import HomePage from './components/HomePage';
import QuizLanding from './containers/QuizLanding';
import EditQuizItemsContainer from './containers/EditQuizItemsContainer';
import LessonsPage from './containers/LessonsPage';

export default (
  <Route path="/" component={AppContainer}>
    <IndexRoute component={HomePage}/>
    <Route path="quiz" component={QuizLanding}/>
    <Route path="quiz/modify" component={EditQuizItemsContainer} />
    <Route path="lessons" component={LessonsPage}/>
  </Route>
);
