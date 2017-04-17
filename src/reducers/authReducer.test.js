/* eslint-disable no-undef */
/* eslint-disable import/no-named-as-default */

import React from 'react';
import authReducer from './authReducer';
import {initialState} from './authReducer';
import * as types from '../constants/actionTypes';
import * as actions from '../actions/eLearnActions';

let state;
beforeEach(() => {
  state = JSON.parse(JSON.stringify(initialState));
})

it('should handle LOADING', () => {
  expect(authReducer(state, actions.loading(
    "sample item being loaded"
  ))).toMatchSnapshot();
})

it('should handle BAD_RESPONSE', () => {
  expect(authReducer(state, actions.badResponse(
    "sample error message"
  ))).toMatchSnapshot();
})

it('should handle LOG_IN', () => {
  expect(authReducer(state, actions.loggedIn(
    {
      name: "sample user",
      _id: "0000",
      courses: [
        {
          _id: "0000",
          name: "sample course",
          enrollable: "someUser@email.com",
          quizzes: [
            {
              _id: "1111",
              title: "sample quiz one"
            }
          ]
        }
      ],
      lessonFolder: [],
      admin: false
    }
  ))).toMatchSnapshot();
})

it('should handle LOG_OUT', () => {
  expect(authReducer(state, actions.logOut()
  )).toMatchSnapshot();
})

it('should handle SELECT_COURSE', () => {
  expect(authReducer(state, actions.selectCourse({
    _id: "0000",
    name: "sample course",
    enrollable: "someUser@email.com",
    quizzes: [
      {
        _id: "1111",
        title: "sample quiz one"
      }
    ]
  })
  )).toMatchSnapshot();
})

it('should handle EDIT_COURSE', () => {
  state.course = {
    _id: "0000",
    name: "sample course",
    enrollable: "someUser@email.com",
    quizzes: [
      {
        _id: "1111",
        title: "sample quiz one"
      }
    ]
  };
  expect(authReducer(state, actions.editCourse("course-title", "updated sample course title")
  )).toMatchSnapshot();
})

it('should handle UPDATE_ENROLLABLE', () => {
  expect(authReducer(state, {
    type: types.UPDATE_ENROLLABLE,
    enrollable: ["sampleUser@email.com"]
  }
  )).toMatchSnapshot();
})

it('should handle UPDATE_ENROLLED', () => {
  expect(authReducer(state, {
    type: types.UPDATE_ENROLLED,
    enrolled: ["sampleUser@email.com"]
  }
  )).toMatchSnapshot();
})

it('should handle UPDATE_COURSE', () => {
  state.courses = [
    {
      _id: "0000",
      name: "sample course",
      enrollable: "someUser@email.com",
      quizzes: [
        {
          _id: "1111",
          title: "sample quiz one"
        }
      ]
    },
    {
      _id: "0001",
      name: "sample course two",
      enrollable: "someUser@email.com",
      quizzes: [
        {
          _id: "1112",
          title: "sample quiz one"
        }
      ]
    }
  ];
  expect(authReducer(state, {
    type: types.UPDATE_COURSE,
    course: {
      _id: "0000",
      name: "updated sample course",
      enrollable: "someUser@email.com",
      quizzes: [
        {
          _id: "1111",
          title: "sample quiz one"
        }
      ]
    }
  }
  )).toMatchSnapshot();
})

it('should handle passing SUBMIT_QUIZ', () => {
  expect(authReducer(state, {
    type: types.SUBMIT_QUIZ,
    score: 3,
    attempt: {
      of: "0000",
      score: 3,
      user: "0000",
      _id: "1111",
      item: [
        {
          question: "question one",
          _id: "aaaa",
          correct: true,
          idSelected: "1a1a",
          itemSelected: 1,
          answers: [
            {
              correct: true,
              answer: "correct answer",
              _id: "1a1a"
            },
            {
              correct: false,
              answer: "correct answer",
              _id: "1a1b"
            },
          ]
        },
        {
          question: "question two",
          _id: "aaab",
          correct: true,
          idSelected: "1a1a",
          itemSelected: 1,
          answers: [
            {
              correct: true,
              answer: "correct answer",
              _id: "1a1a"
            },
            {
              correct: false,
              answer: "correct answer",
              _id: "1a1b"
            },
          ]
        },
        {
          question: "question three",
          _id: "aaac",
          correct: true,
          idSelected: "1a1a",
          itemSelected: 1,
          answers: [
            {
              correct: true,
              answer: "correct answer",
              _id: "1a1a"
            },
            {
              correct: false,
              answer: "correct answer",
              _id: "1a1b"
            },
          ]
        }
      ]
    },
    passed: {
      _id: "aaaa",
      of: "0000"
    }
  }
  )).toMatchSnapshot();
})

it('should handle non-passing SUBMIT_QUIZ', () => {
  expect(authReducer(state, {
    type: types.SUBMIT_QUIZ,
    score: 1,
    attempt: {
      of: "0000",
      score: 1,
      user: "0000",
      _id: "1111",
      item: [
        {
          question: "question one",
          _id: "aaaa",
          correct: true,
          idSelected: "1a1a",
          itemSelected: 1,
          answers: [
            {
              correct: true,
              answer: "correct answer",
              _id: "1a1a"
            },
            {
              correct: false,
              answer: "correct answer",
              _id: "1a1b"
            },
          ]
        },
        {
          question: "question two",
          _id: "aaab",
          correct: false,
          idSelected: "1a1a",
          itemSelected: 1,
          answers: [
            {
              correct: true,
              answer: "correct answer",
              _id: "1a1a"
            },
            {
              correct: false,
              answer: "correct answer",
              _id: "1a1b"
            },
          ]
        },
        {
          question: "question three",
          _id: "aaac",
          correct: false,
          idSelected: "1a1a",
          itemSelected: 1,
          answers: [
            {
              correct: true,
              answer: "correct answer",
              _id: "1a1a"
            },
            {
              correct: false,
              answer: "correct answer",
              _id: "1a1b"
            },
          ]
        }
      ]
    },
    passed: false
  }
  )).toMatchSnapshot();
})

it('should handle DELETE_QUIZ', () => {
  expect(authReducer(state, {
    type: types.DELETE_QUIZ,
    courses: [
      {
        _id: "0000",
        name: "sample course",
        enrollable: "someUser@email.com",
        quizzes: [
          {
            _id: "1111",
            title: "sample quiz one"
          }
        ]
      },
      {
        _id: "0001",
        name: "sample course two",
        enrollable: "someUser@email.com",
        quizzes: [
          {
            _id: "1112",
            title: "sample quiz one"
          }
        ]
      }
    ],
    courseID: "0000"
  }
  )).toMatchSnapshot();
})

it('should handle SAVE_QUIZ', () => {
  state.courses = [
    {
      _id: "0000",
      name: "sample course",
      enrollable: "someUser@email.com",
      quizzes: [
        {
          _id: "1111",
          title: "sample quiz one"
        }
      ]
    },
    {
      _id: "0001",
      name: "sample course two",
      enrollable: "someUser@email.com",
      quizzes: [
        {
          _id: "1112",
          title: "sample quiz one"
        }
      ]
    }
  ];
  expect(authReducer(state, {
    type: types.SAVE_QUIZ,
    course: {
        _id: "0000",
        name: "sample course",
        enrollable: "someUser@email.com",
        quizzes: [
          {
            _id: "1111",
            title: "sample quiz one updated"
          }
        ]
    }
  }
  )).toMatchSnapshot();
})
