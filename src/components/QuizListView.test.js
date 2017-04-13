/* eslint-disable no-undef */
/* eslint-disable import/no-named-as-default */

import React from 'react';
import renderer from 'react-test-renderer';

import QuizListView from './QuizListView';
import QuizListCreator from '../utils/QuizListCreator';
import passedQuizList from '../utils/passedQuizList';

let quizzes, passed;
beforeEach(() => {
  quizzes = [
    {
      _id: "1111",
      title: "example Quiz"
    },
    {
      _id: "1112",
      title: "example Quiz 2"
    }
  ];

  passed = [{
    _id: "2222",
    of: "1111"
  }];
})

it('renders correctly non admin user who has no listed quizzes', () => {
  quizzes = [];
  const tree = renderer.create(
    <QuizListView
      listCreator={QuizListCreator}
      quizzes={""}
      passedQuizList={passedQuizList}
      passed={passed}
      admin={false}
      selectQuiz={jest.fn()}
      editQuiz={jest.fn()}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
})

it('renders correctly admin user who has no listed quizzes', () => {
  quizzes = [];
  const tree = renderer.create(
    <QuizListView
      listCreator={QuizListCreator}
      quizzes={""}
      passedQuizList={passedQuizList}
      passed={passed}
      admin={true}
      selectQuiz={jest.fn()}
      editQuiz={jest.fn()}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
})

it('renders correctly non admin user who has passed two of two quizzes', () => {
  passed.push({
    _id: "2223",
    of: "1112"
  });
  const tree = renderer.create(
    <QuizListView
      listCreator={QuizListCreator}
      quizzes={quizzes}
      passedQuizList={passedQuizList}
      passed={passed}
      admin={false}
      selectQuiz={jest.fn()}
      editQuiz={jest.fn()}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
})

it('renders correctly admin user who has passed two of two quizzes', () => {
  passed.push({
    _id: "2223",
    of: "1112"
  });
  const tree = renderer.create(
    <QuizListView
      listCreator={QuizListCreator}
      quizzes={quizzes}
      passedQuizList={passedQuizList}
      passed={passed}
      admin={true}
      selectQuiz={jest.fn()}
      editQuiz={jest.fn()}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
})

it('renders correctly non admin user who has passed one of two quizzes', () => {
  const tree = renderer.create(
    <QuizListView
      listCreator={QuizListCreator}
      quizzes={quizzes}
      passedQuizList={passedQuizList}
      passed={passed}
      admin={false}
      selectQuiz={jest.fn()}
      editQuiz={jest.fn()}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
})

it('renders correctly admin user who has passed one of two quizzes', () => {
  const tree = renderer.create(
    <QuizListView
      listCreator={QuizListCreator}
      quizzes={quizzes}
      passedQuizList={passedQuizList}
      passed={passed}
      admin={true}
      selectQuiz={jest.fn()}
      editQuiz={jest.fn()}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
})

it('renders correctly non admin user who has passed zero of two quizzes', () => {
  passed[0].of = "2222"
  const tree = renderer.create(
    <QuizListView
      listCreator={QuizListCreator}
      quizzes={quizzes}
      passedQuizList={passedQuizList}
      passed={passed}
      admin={false}
      selectQuiz={jest.fn()}
      editQuiz={jest.fn()}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
})

it('renders correctly admin user who has passed zero of two quizzes', () => {
  passed[0].of = "2222"
  const tree = renderer.create(
    <QuizListView
      listCreator={QuizListCreator}
      quizzes={quizzes}
      passedQuizList={passedQuizList}
      passed={passed}
      admin={true}
      selectQuiz={jest.fn()}
      editQuiz={jest.fn()}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
})
