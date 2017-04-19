/* eslint-disable no-undef */

import React from 'react';
import renderer from 'react-test-renderer';
import {shallow, mount} from 'enzyme';

import AdminView from './AdminView';
import listUsers from '../utils/listUsers';

let editCourse, addUser, deleteUser, deleteUserFromCourse, updateCourse, course;
beforeEach(() => {
  editCourse = jest.fn();
  addUser = jest.fn();
  deleteUser = jest.fn();
  deleteUserFromCourse = jest.fn();
  updateCourse = jest.fn();
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

it('triggers onChange callbacks', () => {
  const wrapper = shallow(
    <AdminView
      editCourse={editCourse}
      addUser={addUser}
      deleteUser={deleteUser}
      deleteUserFromCourse={deleteUserFromCourse}
      message={""}
      updateCourse={updateCourse}
      listUsers={listUsers}
      newUser={"testNew"}
      course={course}
      enrollable={[{email: "new@email.com"}]}
      enrolled={[{email: "enrolled@email.com"}]}
      _id={"00000"}
      token={"someToken"}
      />
  );
  expect(editCourse).not.toHaveBeenCalled()
  wrapper.find('.edit-course-title').simulate('change', "example course edit")
  expect(editCourse).toHaveBeenCalledWith("example course edit")

  expect(addUser).not.toHaveBeenCalled()
  wrapper.find('#new-user').simulate('change', "sampleUser@email.com")
  wrapper.find({name: "newUserForm"}).simulate('submit')
  expect(addUser).toHaveBeenCalled()

  expect(deleteUser).not.toHaveBeenCalled()
  wrapper.find(".user-list").find('.listed-item').first().find('button').simulate('click')
  expect(deleteUser).toHaveBeenCalled()

  expect(deleteUserFromCourse).not.toHaveBeenCalled()
  wrapper.find(".user-list-enrolled").find('.listed-item').first().find('button').simulate('click')
  expect(deleteUserFromCourse).toHaveBeenCalled()

  expect(updateCourse).not.toHaveBeenCalled()
  wrapper.find('#updateCourse').simulate('click')
  expect(updateCourse).toHaveBeenCalledWith("someToken", course)
})

it('triggers onClick callbacks', () => {
  const wrapper = shallow(
    <AdminView
      editCourse={editCourse}
      addUser={addUser}
      deleteUser={deleteUser}
      deleteUserFromCourse={deleteUserFromCourse}
      message={""}
      updateCourse={updateCourse}
      listUsers={listUsers}
      newUser={"testNew"}
      course={course}
      enrollable={[{email: "new@email.com"}]}
      enrolled={[{email: "enrolled@email.com"}]}
      _id={"00000"}
      token={"someToken"}
      />
  );
  expect(deleteUser).not.toHaveBeenCalled()
  wrapper.find(".user-list").find('.listed-item').first().find('button').simulate('click')
  expect(deleteUser).toHaveBeenCalled()

  expect(deleteUserFromCourse).not.toHaveBeenCalled()
  wrapper.find(".user-list-enrolled").find('.listed-item').first().find('button').simulate('click')
  expect(deleteUserFromCourse).toHaveBeenCalled()

  expect(updateCourse).not.toHaveBeenCalled()
  wrapper.find('#updateCourse').simulate('click')
  expect(updateCourse).toHaveBeenCalledWith("someToken", course)
})
