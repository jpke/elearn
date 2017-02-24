import React, {Component} from 'react';
import {Link} from 'react-router';

//view for LessonsContainer
//stateful component for lifecycle hook:
  //getLessons action call upon mounting
  //pulls down list of course pdf lessons
//allows user to select a lesson from list, which pulls preview/download url from server, then displays as a clickable "Preview" link
//clicking "Preview" will open pdf lesson in new browser tab
//unauthenticated user will be instructed to log in to view lessons
export default class LessonsView extends Component {
  constructor(props) {
    super(props);
    //only calls getLessons if user is authenticated (has jwt token)
    if(this.props.token) this.props.getLessons(this.props.token);
  }
  //getPDF action creates async request to server
  //receives lesson BOX preview/download url
  //requires lesson id and user token
  click(event) {
    this.props.getPDF(event.target.id, this.props.token);
  }

  render() {
    let lessons = this.props.lessons.map((lesson, index) => {
      return (
        <li key={index} id={lesson.id} onClick={this.click.bind(this)}>
          {lesson.name}
        </li>
      );
    });

    return (
      <div className="lessonsContainer">
        <h2>{this.props.courseName ?
              this.props.courseName + " Lessons"
              :
              "Lessons"}
        </h2>
        {this.props.token ?
          <div>
            <h3>pdfs</h3>
            <ul className="item-list">
              {lessons}
            </ul>
            {this.props.preview ?
              <div className="preview">
                <a href={this.props.preview} target="_blank">Preview</a>
              </div>
            : ""}
              {this.props.admin && <input type="file" id="uploadPDFInput" name="uploadPDF" onChange={() => {this.props.uploadPDF()}}/>}

          </div>
        :
          <h3>You must be <Link to='/' className="redirect">logged in</Link> to access this content</h3>}
      </div>
    );
  }
}
