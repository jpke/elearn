import React from 'react';

const Register = (props) => {
  return (
    <div className="quizInProgress">
      <h3 className="authTitle">Register</h3>
      <form onSubmit={props.register} id="authRegister">
        <input type="text" id="userName" className="auth" placeholder="name" />
        <input type="email" id="email" className="auth" placeholder="email" />
        <input type="password" id="password" className="auth" placeholder="password" />
        <button type="submit">Register</button>
      </form>
    </div>
  )
};

export default Register;
