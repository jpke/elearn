/* eslint-disable no-undef */
/* eslint-disable import/no-named-as-default */

import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
const store = configureStore();

import QuizListContainer from './QuizListContainer';

it('renders correctly', () => {
  const tree = renderer.create(
    <Provider store={store}>
      <QuizListContainer />
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
})
