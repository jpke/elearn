import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Lessons extends Component {
  constructor(props) {
    super(props);
    if(this.props.token) this.props.getLessons(this.props.token);
  }

  click(event) {
    console.log("click props: ", this.props);
    //download lesson, accessing by lesson id
    this.props.getPDF(event.target.id, this.props.token);
    //get doc id
    // fetch doc shared Link
    // open shared link in new window
  }

  render() {
    console.log("lessons props: ", this.props);
    let lessons = this.props.lessons.map((lesson, index) => {
      return (
        <li key={index} id={lesson.id} onClick={this.click.bind(this)}>
          {lesson.name}
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
            {this.props.preview ?
              <div>
                <a href={this.props.preview} target="_blank">Preview</a>
              </div>
            : ""}
          </div>
        :
          <h3>You must be <Link to='/' className="redirect">logged in</Link> to access this content</h3>}
      </div>
    );
  }
}
