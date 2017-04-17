/* eslint-disable no-undef */
/* eslint-disable import/no-named-as-default */

import React from 'react';
import lessonReducer from './lessonReducer';
import {initialState} from './lessonReducer';
import * as types from '../constants/actionTypes';
import * as actions from '../actions/eLearnActions';

let state;
beforeEach(() => {
  state = JSON.parse(JSON.stringify(initialState));
})

it('should handle GET_LESSONS', () => {
  expect(lessonReducer(state, {
    type: types.GET_LESSONS,
    lessons: [
      {
        type: "file",
        id: "0000",
        etag: "1",
        name: "Example Lesson File.pdf",
        modified_at: "2017-02-02T12:29:25-08:00",
        size: 15342
      },
      {
        type: "file",
        id: "0001",
        etag: "1",
        name: "Example Lesson File Two.pdf",
        modified_at: "2017-02-02T12:29:25-08:00",
        size: 15342
      },
      {
        type: "file",
        id: "0002",
        etag: "1",
        name: "Example Lesson File Three.pdf",
        modified_at: "2017-02-02T12:29:25-08:00",
        size: 15342
      }
    ]
  }
  )).toMatchSnapshot();
})

it('should handle GET_PDF', () => {
  state.lessons = [
    {
      type: "file",
      id: "0000",
      etag: "1",
      name: "Example Lesson File.pdf",
      modified_at: "2017-02-02T12:29:25-08:00",
      size: 15342
    },
    {
      type: "file",
      id: "0001",
      etag: "1",
      name: "Example Lesson File Two.pdf",
      modified_at: "2017-02-02T12:29:25-08:00",
      size: 15342
    },
    {
      type: "file",
      id: "0002",
      etag: "1",
      name: "Example Lesson File Three.pdf",
      modified_at: "2017-02-02T12:29:25-08:00",
      size: 15342
    }
  ];
  expect(lessonReducer(state, {
    type: types.GET_LESSONS,
    selectedPdf: {
      preview: "https://somePreviewAddress.com",
      download: "https://someDownloadAddress.com",
      name: "Example Lesson File.pdf",
      id: "0000"
    }
  }
  )).toMatchSnapshot();
})
