/* eslint-disable no-undef */
/* eslint-disable import/no-named-as-default */

// import * as types from '../constants/actionTypes';
import * as actions from './eLearnActions';

it('should create an action to update loading status upon async call', () => {
  expect(actions.loading("sample async call")).toMatchSnapshot();
})

it('should create an action to update loading status upon async completion', () => {
  expect(actions.loading("")).toMatchSnapshot();
})

it('should create an action to trigger error alert to user', () => {
  expect(actions.badResponse("sample problem occurred message")).toMatchSnapshot();
})

it('should create an action to update loading status upon async call', () => {
  expect(actions.loading("sample async call")).toMatchSnapshot();
})

// it('should create an action to call async registration endpoint', () => {
//   expect(actions.register()).toMatchSnapshot();
// })

it('should create an action to edit course title', () => {
  expect(actions.editCourse("000", "updated course title")).toMatchSnapshot();
})

// it('should create an action to call async endpoint adding user to a course', () => {
//   expect(actions.addUser()).toMatchSnapshot();
// })

// it('should create an action to call async endpoint deleting enrollable user from a course', () => {
//   expect(actions.deleteUser()).toMatchSnapshot();
// })

// it('should create an action to call async endpoint to update course', () => {
//   expect(actions.updateCourse()).toMatchSnapshot();
// })

// it('should create an action to call async endpoint logging user in', () => {
//   expect(actions.logIn()).toMatchSnapshot();
// })

it('should create an action to select a course from courses available to the user', () => {
  expect(actions.selectCourse("Selected Course")).toMatchSnapshot();
})

// it('should create an action to call async endpoint requesting users authorized for a course', () => {
//   expect(actions.getEnrollable()).toMatchSnapshot();
// })

// it('should create an action to call async endpoint removing enrolled user from a course', () => {
//   expect(actions.deleteUserFromCourse()).toMatchSnapshot();
// })

it('should create an action to log user out of client side', () => {
  expect(actions.logOut()).toMatchSnapshot();
})

// it('should create an action to call async endpoint returning certificate of completion of a course', () => {
//   expect(actions.getCertificate()).toMatchSnapshot();
// })

it('should create an action to create a new quiz on client side', () => {
  expect(actions.createQuiz()).toMatchSnapshot();
})

it('should create an action to edit selected quiz clientside', () => {
  expect(actions.editQuiz("1", "quiz item to edit", "updated value", "a")).toMatchSnapshot();
})

// it('should create an action to call async endpoint deleting quiz from database and course', () => {
//   expect(actions.deleteSavedQuiz()).toMatchSnapshot();
// })

it('should create an action to call async endpoint creating or updating a quiz in the database', () => {
  expect(actions.saveQuiz()).toMatchSnapshot();
})

// it('should create an action to select quiz from available quizzes and load quiz data from async endpoint', () => {
//   expect(actions.selectQuiz("some token", "quiz id", "user id")).toMatchSnapshot();
// })

it('should create an action to toggle view between list of available quizzes and quiz start or quiz edit page', () => {
  expect(actions.toggleQuizView()).toMatchSnapshot();
})

// it('should create an action to call async endpoint loading selecting quiz', () => {
//   expect(actions.loadQuiz()).toMatchSnapshot();
// })

it('should create an action to start quiz', () => {
  expect(actions.startQuiz()).toMatchSnapshot();
})

it('should create an action to record user selection of answer to quiz question', () => {
  expect(actions.selectAnswer("answer selected", "id of answer selected", "current quiz item")).toMatchSnapshot();
})

it('should create an action to advance to next question of quiz', () => {
  expect(actions.nextQuestion()).toMatchSnapshot();
})

it('should create an action to return to prior question of quiz', () => {
  expect(actions.prevQuestion()).toMatchSnapshot();
})

// it('should create an action to call async endpoint recording quiz submission', () => {
//   expect(actions.register()).toMatchSnapshot();
// })

// it('should create an action to call async endpoint retrieving course lesson list', () => {
//   expect(actions.getLessons()).toMatchSnapshot();
// })

it('should create an action to load link to view pdf lesson', () => {
  expect(actions.loadPreview("file data returned from api request")).toMatchSnapshot();
})

// it('should create an action to call async endpoint requesting url of pdf lesson preview', () => {
//   expect(actions.getPDF()).toMatchSnapshot();
// })

// it('should create an async action uploading pdf to course lessons', () => {
//   expect(actions.uploadPDF()).toMatchSnapshot();
// })

// it('should create an action to call async endpoint deleting pdf lesson from course lesson list', () => {
//   expect(actions.deletePDF()).toMatchSnapshot();
// })
