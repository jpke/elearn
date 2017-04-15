/* eslint-disable no-undef */
/* eslint-disable import/no-named-as-default */

import React from 'react';
import renderer from 'react-test-renderer';

import QuizStartView from './QuizStartView';

let attempts;
beforeAll(() => {
  attempts = [
    {
      score: 0
    },
    {
      score: 2
    },
    {
      score: 1
    }
  ]
})

it('renders correctly for non passed quiz', () => {
  const tree = renderer.create(
    <QuizStartView
      startQuiz={jest.fn()}
      viewQuizzes={jest.fn()}
      passed={false}
      score={5}
      attempts={attempts}
      title={"sample quiz title"}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
})

it('renders correctly for passed quiz', () => {
  const tree = renderer.create(
    <QuizStartView
      startQuiz={jest.fn()}
      viewQuizzes={jest.fn()}
      passed={true}
      score={5}
      attempts={attempts}
      title={"sample quiz title"}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
})
