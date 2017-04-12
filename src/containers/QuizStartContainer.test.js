import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
const store = configureStore();

import QuizStartContainer from './QuizStartContainer';

it('renders correctly', () => {
  const tree = renderer.create(
    <Provider store={store}>
      <QuizStartContainer />
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
})
