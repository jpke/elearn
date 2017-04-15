/* eslint-disable no-undef */
/* eslint-disable import/no-named-as-default */

import React from 'react';
import renderer from 'react-test-renderer';

import AnswerList from './AnswerList';

it('renders correctly', () => {
  const tree = renderer.create(
    <AnswerList
      idSelected={""}
      itemSelected={1}
      answers={[
        {
          answer: "no current answer",
          correct: false
        },
        {
          answer: "no current answer true",
          correct: true
        }
      ]}
      selectAnswer={jest.fn()}
      />
  ).toJSON();
  expect(tree).toMatchSnapshot();
})
