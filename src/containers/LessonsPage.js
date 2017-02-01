import React from 'react';
import {Link} from 'react-router';

const LessonsPage = (props) => {
  return (
    <div>
      <h1>Lessons Page</h1>

      <h2>Links to lessons will go here, intially pdfs.</h2>
      {this.props.loggedIn ?
        ""
      :
        <h3>You must be <Link to='/' className="redirect">logged in</Link> to access this content</h3>}
    </div>
  );
};

export default LessonsPage;
