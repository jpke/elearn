import React from 'react';
import {Link} from 'react-router';
import QuizViewContainer from '../containers/QuizViewContainer';
import QuizStartContainer from '../containers/QuizStartContainer';
import QuizListContainer from '../containers/QuizListContainer';

const Quiz = (props) => {
  console.log("quiz props: ", props);
  return (
    <div className="quizContainer">
      <h2>Quiz</h2>
      {props.token ? (
        props.quizInProgress ?
          <QuizViewContainer />
         :
         props.viewQuizSelected ?
          <QuizStartContainer />
          :
          <QuizListContainer />
      ) : (
        <h3>You must be <Link to='/' className="redirect">logged in</Link> to access this content</h3>
      )}
    </div>
  );
}

export default Quiz;
