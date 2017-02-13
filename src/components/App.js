import React, { PropTypes, Component } from 'react';
import { Link, IndexLink } from 'react-router';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
export default class App extends Component {
  static propTypes = {
    children: PropTypes.element
  }

  render() {
    if(this.props.errorMessage) {
      alert(this.props.errorMessage.concat(", please try again, or contact your instructor for help"));
    }
    return (
      <div>
        <div className="header">
          <div>
            <IndexLink to="/">Home</IndexLink>
            {' | '}
            <Link to="/quiz">Quiz</Link>
            {' | '}
            <Link to="/lessons">Lessons</Link>
          </div>
          {this.props.token ? <div className="user-name"><p>Logged in as &nbsp;</p><p>{this.props.userName}</p></div> : ""}
        </div>
          <br/>
          <h1>Learn Online</h1>
          {this.props.children}
      </div>
    );
  }
}
