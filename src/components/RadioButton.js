import React from 'react';

const RadioButton = (props) => {
  console.log("radio button props: ", props);

  return <input type="radio" id={props.index + " radio " + props.idx} className="answer-radio" checked={props.correct == true} onChange={(e) => {props.editQuizItem(e)}}/>
};

export default RadioButton;
