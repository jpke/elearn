import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Lessons extends Component {
  constructor(props) {
    super(props);
    if(this.props.token) this.props.getLessons(this.props.token);
  }

  render() {
    let lessons = this.props.lessons.map((lesson, index) => {
      return (
        <li key={index} id={index}>
          <p>{lesson.title}<span>{lesson.description}</span></p>
        </li>
      );
    });

    return (
      <div>
        <h1>Lessons Page</h1>
        {this.props.token ?
          <div>
            <h2>Links to lessons will go here, intially pdfs.</h2>
            <ul>
              {lessons}
            </ul>
          </div>
        :
          <h3>You must be <Link to='/' className="redirect">logged in</Link> to access this content</h3>}
      </div>
    );
  }
}
