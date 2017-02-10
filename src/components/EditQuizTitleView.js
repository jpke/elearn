import React from 'react';

const EditQuizTitleView = (props) =>  {
  console.log("edit quiz view :" , props);
return (
    <div className="editQuizTitle">
      <h3>Title</h3>
      <input type="text" id="0 title" name="title" className="edit-quiz-item" defaultValue={props.title} onChange={(e) => {props.editQuizItem(e)}}/>
      <h3>Passing Score</h3>
      <input type="number" id="0 minimumScore" name="minimumScore" className="edit-quiz-item" defaultValue={props.minimumScore} onChange={(e) => {props.editQuizItem(e)}}/>
    </div>
);
}

export default EditQuizTitleView;
