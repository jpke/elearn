import React from 'react';

const Register = (props) => {
  return (
    <div className="registerContainer">
      <h3 className="title">Register</h3>
      <form onSubmit={props.register} id="authForm">
        <input type="text" id="userName" className="auth" placeholder="name" />
        <input type="email" id="email" className="auth" placeholder="email" />
        <input type="password" id="password" className="auth" placeholder="password" />
        <button className="authButton" type="submit">Register</button>
      </form>
    </div>
  )
};

export default Register;
