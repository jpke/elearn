import React from 'react';

const Login = (props) => {
  return (
    <div className="loginContainer">
      <h3 className="title">Login</h3>
      <form onSubmit={props.logIn} id="authForm">
        <input type="email" id="email" className="auth" placeholder="email" />
        <input type="password" id="password" className="auth" placeholder="password" />
        <button className="authButton" type="submit">Login</button>
      </form>
    </div>
  )
};

export default Login;
