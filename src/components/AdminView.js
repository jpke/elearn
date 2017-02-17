import React from 'react';

const AdminView = (props) => (
  <div>
    <Link to="/" >
      <button id="toggleView" className="toggleView">Back to Courses
      </button>
    </Link>
    <div>
      <h2>Email addresses of students who can register for the course</h2>
    </div>
    <div className="enrollable-users">
      <ul className="quiz-list">
        {props.listUsers(props.course.enrollable, props.deleteUser)}
      </ul>
    </div>
    <button className="add-student" onClick={() => {props.editQuiz()}}>Add Student</button>}
  </div>
);

export default AdminView;
