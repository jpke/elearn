/* eslint-disable no-undef */
/* eslint-disable import/no-named-as-default */

import React from 'react';
import renderer from 'react-test-renderer';

import AuthView from './AuthView';

let courses, passed;
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
    of: "1111"
  }];
})

it('renders correctly when logged out', () => {
  const tree = renderer.create(
    <AuthView
      toggleView={jest.fn()}
      register={jest.fn()}
      logIn={jest.fn()}
      viewLogin={false}
      selectCourse={jest.fn()}
      logOut={jest.fn()}
      courses={courses}
      course={courses[0]}
      passed={passed}
      token={""}
      url={"urlAddress"}
      demo={jest.fn()}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
})

it('renders correctly when logged in and non-admin course unselected', () => {
  courses[0].admin = false;
  const tree = renderer.create(
    <AuthView
      toggleView={jest.fn()}
      register={jest.fn()}
      logIn={jest.fn()}
      viewLogin={false}
      selectCourse={jest.fn()}
      logOut={jest.fn()}
      courses={courses}
      course={""}
      passed={passed}
      token={"000000"}
      url={"urlAddress"}
      demo={jest.fn()}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
})

it('renders correctly when logged in and non-admin course selected', () => {
  courses[0].admin = false;
  const tree = renderer.create(
    <AuthView
      toggleView={jest.fn()}
      register={jest.fn()}
      logIn={jest.fn()}
      viewLogin={false}
      selectCourse={jest.fn()}
      logOut={jest.fn()}
      courses={courses}
      course={courses[0]}
      passed={passed}
      token={"000000"}
      url={"urlAddress"}
      demo={jest.fn()}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
})

it('renders correctly when logged in and admin course unselected', () => {
  courses[0].admin = true;
  const tree = renderer.create(
    <AuthView
      toggleView={jest.fn()}
      register={jest.fn()}
      logIn={jest.fn()}
      viewLogin={false}
      selectCourse={jest.fn()}
      logOut={jest.fn()}
      courses={courses}
      course={""}
      passed={passed}
      token={"000000"}
      url={"urlAddress"}
      demo={jest.fn()}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
})

it('renders correctly when logged in and admin course selected', () => {
  courses[0].admin = true;
  const tree = renderer.create(
    <AuthView
      toggleView={jest.fn()}
      register={jest.fn()}
      logIn={jest.fn()}
      viewLogin={false}
      selectCourse={jest.fn()}
      logOut={jest.fn()}
      courses={courses}
      course={courses[0]}
      passed={passed}
      token={"000000"}
      url={"urlAddress"}
      demo={jest.fn()}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
})
