import React from "react";

//view called by UpdatePasswordContainer as part of CourseList
//displays form allowing user to enter current and new password to update password
const UpdatePasswordView = props => {
  return (
    <div className="registerContainer">
      <h3 className="title">Update Password</h3>
      <form onSubmit={props.updatePassword} id="authForm">
        <input
          type="text"
          id="oldPassword"
          className="auth"
          placeholder="password"
        />
        <input
          type="password"
          id="password"
          className="auth"
          placeholder="new password"
        />
        <button className="authButton" type="submit">
          Update
        </button>
      </form>
      <button
        className="authButton"
        onClick={() => props.toggleView()}
        type="submit"
      >
        Cancel
      </button>
    </div>
  );
};

export default UpdatePasswordView;
