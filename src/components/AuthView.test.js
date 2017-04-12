/* eslint-disable no-undef */
/* eslint-disable import/no-named-as-default */

import React from 'react';
import renderer from 'react-test-renderer';

import AuthView from './AuthView';

it('renders correctly when logged out', () => {
  const tree = renderer.create(
    <AuthView
      toggleView={jest.fn()}
      register={jest.fn()}
      logIn={jest.fn()}
      viewLogin={false}
      selectCourse={jest.fn()}
      logOut={jest.fn()}
      courses={[{
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
      }]}
      course={[{
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
      }]}
      passed={[{
        _id: "2222",
        of: "1111"
      }]}
      token={""}
      url={"urlAddress"}
      demo={jest.fn()}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
})

it('renders correctly when logged in not as admin with no course selected', () => {
  const tree = renderer.create(
    <AuthView
      toggleView={jest.fn()}
      register={jest.fn()}
      logIn={jest.fn()}
      viewLogin={false}
      selectCourse={jest.fn()}
      logOut={jest.fn()}
      courses={[{
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
      }]}
      course={""}
      passed={[{
        _id: "2222",
        of: "1111"
      }]}
      token={"000000"}
      url={"urlAddress"}
      demo={jest.fn()}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
})

it('renders correctly when logged in not as admin with course selected', () => {
  const tree = renderer.create(
    <AuthView
      toggleView={jest.fn()}
      register={jest.fn()}
      logIn={jest.fn()}
      viewLogin={false}
      selectCourse={jest.fn()}
      logOut={jest.fn()}
      courses={[{
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
      }]}
      course={[{
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
      }]}
      passed={[{
        _id: "2222",
        of: "1111"
      }]}
      token={"000000"}
      url={"urlAddress"}
      demo={jest.fn()}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
})

it('renders correctly when logged in as admin with no course selected', () => {
  const tree = renderer.create(
    <AuthView
      toggleView={jest.fn()}
      register={jest.fn()}
      logIn={jest.fn()}
      viewLogin={false}
      selectCourse={jest.fn()}
      logOut={jest.fn()}
      courses={[{
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
      }]}
      course={""}
      passed={[{
        _id: "2222",
        of: "1111"
      }]}
      token={"000000"}
      url={"urlAddress"}
      demo={jest.fn()}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
})

it('renders correctly when logged in as admin with course selected', () => {
  const tree = renderer.create(
    <AuthView
      toggleView={jest.fn()}
      register={jest.fn()}
      logIn={jest.fn()}
      viewLogin={false}
      selectCourse={jest.fn()}
      logOut={jest.fn()}
      courses={[{
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
      }]}
      course={[{
        name: "example course",
        id: "00000",
        enrollable: [{email: "new@email.com"}],
        quizzes: [
          {
            _id: "1111",
            title: "example Quiz"
          }
        ],
        admin: true
      }]}
      passed={[{
        _id: "2222",
        of: "1111"
      }]}
      token={"000000"}
      url={"urlAddress"}
      demo={jest.fn()}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
})
