/* eslint-disable no-undef */
/* eslint-disable import/no-named-as-default */

import React from 'react';
import renderer from 'react-test-renderer';

import EditQuizTitleView from './EditQuizTitleView';

it('renders correctly', () => {
  const tree = renderer.create(
    <EditQuizTitleView
      title={"Sample Quiz Title"}
      minimumScore={1}
      editQuizItem= {jest.fn()}
      saveQuiz={jest.fn()}
      deleteQuiz={jest.fn()}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
})
