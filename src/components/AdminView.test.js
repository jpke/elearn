/* eslint-disable no-undef */

import React from 'react';
import renderer from 'react-test-renderer';

import AdminView from './AdminView';
import listUsers from '../utils/listUsers';

it('renders correctly initally', () => {
  const tree = renderer.create(
    <AdminView
      editCourse={jest.fn()}
      addUser={jest.fn()}
      deleteUser={jest.fn()}
      deleteUserFromCourse={jest.fn()}
      message={""}
      updateCourse={jest.fn()}
      listUsers={listUsers}
      newUser={""}
      course={""}
      enrollable={[]}
      enrolled={[]}
      _id={""}
      token={""}
      />
  ).toJSON();
  expect(tree).toMatchSnapshot();
})

it('renders correctly with enrolled users', () => {
  const tree = renderer.create(
    <AdminView
      editCourse={jest.fn()}
      addUser={jest.fn()}
      deleteUser={jest.fn()}
      deleteUserFromCourse={jest.fn()}
      message={""}
      updateCourse={jest.fn()}
      listUsers={listUsers}
      newUser={"testNew"}
      course={"someCourse"}
      enrollable={[{email: "new@email.com"}]}
      enrolled={[{email: "enrolled@email.com"}]}
      _id={"00000"}
      token={"someToken"}
      />
  ).toJSON();
  expect(tree).toMatchSnapshot();
})
