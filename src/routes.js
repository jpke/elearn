import React from 'react';
import { Route, IndexRoute } from 'react-router';

import AppContainer from './containers/AppContainer';
import AuthContainer from './containers/AuthContainer';
import QuizLandingContainer from './containers/QuizLandingContainer';
import EditQuizContainer from './containers/EditQuizContainer';
import LessonsContainer from './containers/LessonsContainer';
import AdminContainer from './containers/AdminContainer';

//define clientside navigation routes
export default (
  <Route path="/" component={AppContainer}>
    <IndexRoute component={AuthContainer}/>
    <Route path="quiz" component={QuizLandingContainer}/>
    <Route path="quiz/modify" component={EditQuizContainer}/>
    <Route path="lessons" component={LessonsContainer}/>
    <Route path="admin" component={AdminContainer}/>
  </Route>
);
