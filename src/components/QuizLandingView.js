import React from 'react';
import {Link} from 'react-router';
import QuizContainer from '../containers/QuizContainer';
import QuizStartContainer from '../containers/QuizStartContainer';
import QuizListContainer from '../containers/QuizListContainer';

//view for QuizLandingContainer
//displays message redirecting to AuthContainer when user is not logged in
//displays QuizViewContainer when user has started quiz
//displays QuizStartContainer when user has selected quiz but not yet started it
//displays QuizListContainer otherwise
const QuizLandingView = (props) => {
  return (
    <div className="quizContainer">
      <h2>{props.courseName ? props.courseName + " Quizzes" : "Quizzes"}</h2>
      {props.token ?
        //if user is authenticated check for if quiz is in progress
      (
        props.quizInProgress ?
        //if so, display quiz
          <QuizContainer />
         :
         //otherwise check if a quiz has been selected from the list
         props.viewQuizSelected ?
          //if so, display start page for that quiz, which also displays user stats for that quiz
          <QuizStartContainer />
          :
          //otherwise display list of quizzes available
          //if user is course admin, this list offers option to go to edit quiz view
          <QuizListContainer />
        ) : (
        <h3>You must be <Link to='/' className="redirect">logged in</Link> to access this content</h3>
        )
      }
    </div>
  );
}

export default QuizLandingView;
