/* eslint-disable no-undef */
/* eslint-disable import/no-named-as-default */

import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
const store = configureStore();

import QuizContainer from './QuizContainer';

it('renders correctly', () => {
  const tree = renderer.create(
    <Provider store={store}>
      <QuizContainer />
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
})
