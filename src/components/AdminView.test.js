/* eslint-disable no-undef */

import React from 'react';
import renderer from 'react-test-renderer';
import {shallow, mount} from 'enzyme';

import AdminView from './AdminView';
import listUsers from '../utils/listUsers';

let editCourse, course;
beforeEach(() => {
  editCourse = jest.fn();
  course = {
    _id: "0000",
    name: "example course"
  };
})

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
      course={course}
      enrollable={[{email: "new@email.com"}]}
      enrolled={[{email: "enrolled@email.com"}]}
      _id={"00000"}
      token={"someToken"}
      />
  ).toJSON();
  expect(tree).toMatchSnapshot();
})

it('triggers input onChange callback', () => {
  const wrapper = shallow(
    <AdminView
      editCourse={editCourse}
      addUser={jest.fn()}
      deleteUser={jest.fn()}
      deleteUserFromCourse={jest.fn()}
      message={""}
      updateCourse={jest.fn()}
      listUsers={listUsers}
      newUser={"testNew"}
      course={course}
      enrollable={[{email: "new@email.com"}]}
      enrolled={[{email: "enrolled@email.com"}]}
      _id={"00000"}
      token={"someToken"}
      />
  );
  expect(jest.fn()).not.toHaveBeenCalled();
  wrapper.find('.edit-course-title').simulate('change', "example course edit")
  expect(editCourse).toHaveBeenCalledWith("example course edit");
})
