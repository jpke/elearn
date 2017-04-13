/* eslint-disable no-undef */
/* eslint-disable import/no-named-as-default */

import React from 'react';
import renderer from 'react-test-renderer';

import Register from './Register';

it('renders correctly', () => {
  const tree = renderer.create(
    <Register register={jest.fn()} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
})
