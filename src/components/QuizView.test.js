/* eslint-disable no-undef */
/* eslint-disable import/no-named-as-default */

import React from 'react';
import renderer from 'react-test-renderer';

import QuizView from './QuizView';

let answers;
beforeAll(() => {
  answers =
  [
    {
      answer: "false current answer",
      correct: false
    },
    {
      answer: "true current answer",
      correct: true
    }
  ]
})

it('renders correctly quiz question without a selected answer', () => {
  const tree = renderer.create(
    <QuizView
      selectAnswer={jest.fn()}
      nextQuestion={jest.fn()}
      prevQuestion={jest.fn()}
      submitQuiz={jest.fn()}
      title={"sample quiz title"}
      question={"a quiz question here"}
      answers={answers}
      idSelected={""}
      itemSelected={""}
      currentQuestionIndex={0}
      questionCount={3}
      unansweredQuestions={3}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
})

it('renders correctly quiz question with a selected answer', () => {
  const tree = renderer.create(
    <QuizView
      selectAnswer={jest.fn()}
      nextQuestion={jest.fn()}
      prevQuestion={jest.fn()}
      submitQuiz={jest.fn()}
      title={"sample quiz title"}
      question={"a quiz question here"}
      answers={answers}
      idSelected={"0000"}
      itemSelected={0}
      currentQuestionIndex={0}
      questionCount={3}
      unansweredQuestions={3}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
})
