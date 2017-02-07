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
    console.log("app props: ", this.props);
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
          {this.props.token ? <p>Logged in as {this.props.userName}</p> : ""}
        </div>
          <br/>
          {this.props.children}
      </div>
    );
  }
}
