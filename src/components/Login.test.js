/* eslint-disable no-undef */
/* eslint-disable import/no-named-as-default */

import React from 'react';
import renderer from 'react-test-renderer';

import Login from './Login';

it('renders correctly', () => {
  const tree = renderer.create(
    <Login logIn={jest.fn()} demo={jest.fn()}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
})
