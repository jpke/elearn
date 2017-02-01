import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Lessons extends Component {
  constructor(props) {
    super(props);
    if(this.props.loggedIn) this.props.getLessons(this.props.token);
  }

  render() {
    let lessons
    return (
      <div>
        <h1>Lessons Page</h1>
        {this.props.loggedIn ?
          <h2>Links to lessons will go here, intially pdfs.</h2>
        :
          <h3>You must be <Link to='/' className="redirect">logged in</Link> to access this content</h3>}
      </div>
    );
  }
}
