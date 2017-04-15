/* eslint-disable no-undef */
/* eslint-disable import/no-named-as-default */

import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
const store = configureStore();

import QuizLandingView from './QuizLandingView';

it('renders correctly for logged out user', () => {
  const tree = renderer.create(
    <Provider store={store}>
      <QuizLandingView
        viewQuizSelected={false}
        courseName={"sample course name"}
        quizInProgress={false}
        token={""}
      />
  </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
})

it('renders correctly for logged in user with unselected quiz', () => {
  const tree = renderer.create(
    <Provider store={store}>
      <QuizLandingView
        viewQuizSelected={false}
        courseName={"sample course name"}
        quizInProgress={false}
        token={"0000"}
      />
  </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
})

it('renders correctly for logged in user with selected quiz not started', () => {
  const tree = renderer.create(
    <Provider store={store}>
      <QuizLandingView
        viewQuizSelected={true}
        courseName={"sample course name"}
        quizInProgress={false}
        token={"0000"}
      />
  </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
})

it('renders correctly for logged in user with selected quiz started', () => {
  const tree = renderer.create(
    <Provider store={store}>
      <QuizLandingView
        viewQuizSelected={true}
        courseName={"sample course name"}
        quizInProgress={true}
        token={"0000"}
      />
  </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
})
