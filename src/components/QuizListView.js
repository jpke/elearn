import React, {Component} from 'react';

const QuizListView = (props) => (
    <div>
    {props.listCreator(props.quizzes, props.selectQuiz)}
    </div>
);

export default QuizListView;
