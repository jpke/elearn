import React from 'react';

const EditQuizTitleView = (props) =>  {
  console.log("edit quiz view :" , props);
return (
    <div className="editQuizTitle">
      <input type="text" id="title" name="title" className="edit-quiz-item" defaultValue={props.title} onChange={(e) => {props.editQuizItem(e)}}/>
      <input type="text" id="minimumScore" name="minimumScore" className="edit-quiz-item" defaultValue={props.minimumScore} onChange={(e) => {props.editQuizItem(e)}}/>
    </div>
);
}

export default EditQuizTitleView;
