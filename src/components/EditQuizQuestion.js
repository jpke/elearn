import React from 'react';

const EditQuizQuestion = (props) => {
  console.log("props edit: ", props.item)
  const answerList = (answers) => {
    console.log("answers: ", answers);
    let answerList = [];
    for(let i in answers) {
      answerList.push(
        <div key={i}>
          <input type="text" id={"answerIndex " + i + "index: " + props.index} className="quizAnswer" name="quizAnswer" placeholder={answers[i].answer}/>
          <label>
            <input type="radio" id={"answerIndex " + i + "index: " + props.index + " radio"} name="quizAnswerRadio" value={i}/>Correct
          </label>
        </div>
      );
    }
    console.log("answerlist: ", answerList);
    return answerList;
  };

  return (
    <div className="quizItem">
      <input type="text" id={props.index || 0} name="question" className="quizQuestion" placeholder={props.item.question}/>
      {answerList(props.item.answers)}
    </div>
  );
};

export default EditQuizQuestion;
