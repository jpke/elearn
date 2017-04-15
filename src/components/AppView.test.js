/* eslint-disable no-undef */

import React from 'react';
import renderer from 'react-test-renderer';

import AppView from './AppView';

it('renders correctly', () => {
  const tree = renderer.create(
    <AppView
      userName={"currentUser"}
      token={"someToken"}
      children={[]}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
})
