import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Lessons extends Component {
  constructor(props) {
    super(props);
    if(this.props.token) this.props.getLessons(this.props.token);
  }

  onClick(event) {
    //get doc id
    fetch doc shared Link
    open shared link in new window
  }

  render() {
    console.log("lessons props: ", this.props.lessons);
    let lessons = this.props.lessons.map((lesson, index) => {
      return (
        <li key={index} id={index} onClick={this.onclick.bind(this)}>
          <p>{lesson.name}<span>{lesson.id}</span></p>
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
