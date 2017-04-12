/* eslint-disable no-undef */
/* eslint-disable import/no-named-as-default */

import React from 'react';
import renderer from 'react-test-renderer';

import EditQuizItemView from './EditQuizItemView';

let question, answers;
beforeAll(() => {
  question = "no current question";
  answers =
    [
      {
        answer: "no current answer",
        correct: false
      },
      {
        answer: "no current answer true",
        correct: true
      }
    ];
})

it('renders correctly', () => {
  const tree = renderer.create(
    <EditQuizItemView
      key={1}
      question={question}
      answers={answers}
      index={1}
      editQuizItem={jest.fn()}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
})
