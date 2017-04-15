/* eslint-disable no-undef */
/* eslint-disable import/no-named-as-default */

import React from 'react';
import renderer from 'react-test-renderer';

import LessonsView from './LessonsView';

let lessons, preview;
beforeAll(() => {
  lessons = [
    {
      type: "file",
      id: "130861063664",
      etag: "1",
      name: "Example PDF.pdf",
      modified_at: "2017-02-02T12:29:25-08:00",
      size: 15342
    },
    {
      type: "file",
      id: "130861063665",
      etag: "1",
      name: "Example 2 PDF.pdf",
      modified_at: "2017-02-02T12:29:25-08:00",
      size: 15343
    }
  ];
  preview = {
    preview: "previewUrl",
    download: "fileDownloadUrl",
    name: "Example PDF.pdf",
    id: "130861063664",
  }
})

it('renders correctly for logged in non-admin user', () => {
  const tree = renderer.create(
    <LessonsView
      getLessons={jest.fn()}
      getPDF={jest.fn()}
      uploadPDF={jest.fn()}
      deletePDF={jest.fn()}
      token={"0000"}
      courseName={"example course"}
      courseID={"0000"}
      admin={false}
      lessons={lessons}
      loading={false}
      preview={preview}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
})

it('renders correctly for logged in admin user', () => {
  const tree = renderer.create(
    <LessonsView
      getLessons={jest.fn()}
      getPDF={jest.fn()}
      uploadPDF={jest.fn()}
      deletePDF={jest.fn()}
      token={"0000"}
      courseName={"example course"}
      courseID={"0000"}
      admin={true}
      lessons={lessons}
      loading={false}
      preview={preview}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
})

it('renders correctly for logged out user', () => {
  const tree = renderer.create(
    <LessonsView
      getLessons={jest.fn()}
      getPDF={jest.fn()}
      uploadPDF={jest.fn()}
      deletePDF={jest.fn()}
      token={""}
      courseName={"example course"}
      courseID={"0000"}
      admin={false}
      lessons={lessons}
      loading={false}
      preview={preview}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
})
