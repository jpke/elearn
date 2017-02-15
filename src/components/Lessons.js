import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Lessons extends Component {
  constructor(props) {
    super(props);
    if(this.props.token) this.props.getLessons(this.props.token);
  }

  click(event) {
    //download lesson, accessing by lesson id
    this.props.getPDF(event.target.id, this.props.token);
  }

  upload(event) {
    // console.log(event.target);
    // let input = document.querySelector('input[type="file"]');
    // var data = new FormData();
    // data.append('file', input.files[0]);
    // console.log("data: ", data);
    //
    // fetch('http://localhost:8080/elearn/lessons/', {
    //   method: 'POST',
    //   body: data
    // });
  }

  render() {
    let lessons = this.props.lessons.map((lesson, index) => {
      return (
        <li key={index} id={lesson.id} onClick={this.click.bind(this)}>
          {lesson.name}
        </li>
      );
    });

    // <input type="file"/>
    // <button onClick={this.upload.bind(this)}>Submit</button>

    return (
      <div className="lessonsContainer">
        <h2>Lessons</h2>
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
          </div>
        :
          <h3>You must be <Link to='/' className="redirect">logged in</Link> to access this content</h3>}
      </div>
    );
  }
}
