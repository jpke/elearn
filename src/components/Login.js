import React from 'react';

const Login = (props) => {
  return (
    <div className="quizInProgress">
      <h3 className="authTitle">Login</h3>
      <form onSubmit={props.logIn} id="authRegister">
        <input type="email" id="email" className="auth" placeholder="email" />
        <input type="password" id="password" className="auth" placeholder="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  )
};

export default Login;
