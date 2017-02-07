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
    return (
      <div>
        <div className="header">
          <div>
            <IndexLink to="/">Home</IndexLink>
            {' | '}
            <Link to="/quiz">Quiz</Link>
            {' | '}
            <Link to="/lessons">Lessons</Link>
          </div> ""}
          <p>Logged in as ""</p>
        </div>
          <br/>
          {this.props.children}
      </div>
    );
  }
}
