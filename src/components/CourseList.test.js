/* eslint-disable no-undef */
/* eslint-disable import/no-named-as-default */

import React from 'react';
import renderer from 'react-test-renderer';

import CourseList from './CourseList';
import CourseListCreator from '../utils/CourseListCreator'

let courses, passed, courseList;
beforeAll(() => {
  courses = [{
    name: "example course",
    id: "00000",
    enrollable: [{email: "new@email.com"}],
    quizzes: [
      {
        _id: "1111",
        title: "example Quiz"
      }
    ],
    admin: false
  }];

  passed = [{
    _id: "2222",
    of: "1110"
  }];

  courseList = CourseListCreator(courses, jest.fn(), passed, "someToken", "urlAddress");
})

it('renders correctly', () => {
  const tree = renderer.create(
    <CourseList
      courses={courseList}
      course={courses[0]}
      logOut={jest.fn()}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
})
