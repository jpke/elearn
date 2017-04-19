/* eslint-disable no-undef */
/* eslint-disable import/no-named-as-default */

import React from 'react';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

import AnswerList from './AnswerList';

let selectAnswer, answers;
beforeEach(() => {
  selectAnswer = jest.fn();
  answers = [
    {
      _id: "0001",
      answer: "no current answer",
      correct: false
    },
    {
      _id: "0002",
      answer: "no current answer true",
      correct: true
    }
  ];
})

it('renders correctly', () => {
  const tree = renderer.create(
    <AnswerList
      idSelected={""}
      itemSelected={1}
      answers={answers}
      selectAnswer={selectAnswer}
      />
  ).toJSON();
  expect(tree).toMatchSnapshot();
})

it('li click calls selectAnswer callback with selected li data', () => {
  const simulatedEvent = {
    target: {
      id: answers[0]._id,
      textContent: answers[0].answer
    }
  };
  const simulatedEventTwo = {
    target: {
      id: answers[1]._id,
      textContent: answers[1].answer
    }
  };
  const wrapper = shallow(
    <AnswerList
      idSelected={""}
      itemSelected={1}
      answers={answers}
      selectAnswer={selectAnswer}
      />
  );
  expect(selectAnswer).not.toHaveBeenCalled()
  wrapper.find('li').first().simulate('click', simulatedEvent)
  expect(selectAnswer).toHaveBeenCalledWith(simulatedEvent.target.textContent, simulatedEvent.target.id, 0)

  wrapper.find('li').last().simulate('click', simulatedEventTwo)
  expect(selectAnswer).toHaveBeenCalledWith(simulatedEventTwo.target.textContent, simulatedEventTwo.target.id, 1)
})
