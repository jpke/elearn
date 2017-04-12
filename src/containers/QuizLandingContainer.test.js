import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
const store = configureStore();

import QuizLandingContainer from './QuizLandingContainer';

it('renders correctly', () => {
  const tree = renderer.create(
    <Provider store={store}>
      <QuizLandingContainer />
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
})
