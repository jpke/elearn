import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
const store = configureStore();

import LessonsContainer from './LessonsContainer';

it('renders correctly', () => {
  const tree = renderer.create(
    <Provider store={store}>
      <LessonsContainer />
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
})
