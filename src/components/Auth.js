import React, {PropTypes, Component} from 'react';

export default class Auth extends Component {
  static propTypes = {
    register: PropTypes.func.isRequired,
    logIn: PropTypes.func.isRequired,
    logOut: PropTypes.func.isRequired,
  }

  constructor(props, context) {
    super(props, context);
  }
  register(event) {
    event.preventDefault();
    const form = event.target.elements;
    this.props.register(form.userName.value, form.email.value, form.password.value);
  }
  logIn(event) {
    console.log(event)
    // this.props.logIn();
  }
  logOut() {
    this.props.logOut();
  }
  render() {
      return (
        <div className="authContainer">
          <h2>Welcome</h2>
          <div className="quizInProgress">
            <p>You must login or register</p>
            <h3 className="authTitle">Register</h3>
            <form onSubmit={this.register.bind(this)} id="authRegister">
              <input type="text" id="userName" className="auth" placeholder="name" />
              <input type="email" id="email" className="auth" placeholder="email" />
              <input type="password" id="password" className="auth" placeholder="password" />
              <button type="submit">Register</button>
            </form>
            <button onClick={this.register.bind(this)}>Register</button>
            <button onClick={this.logIn.bind(this)}>Login</button>
            <button onClick={this.logOut.bind(this)}>Logout</button>
          </div>
        </div>
      );
  }
}
