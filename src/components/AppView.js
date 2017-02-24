import React from 'react';
import { Link, IndexLink } from 'react-router';

//view component, receives props from AppContainer
//returns background app view nav and header
//calls child components passed in as props
const AppView = (props) => (
  <div>
    <div className="header">
      <div>
        <IndexLink to="/">Home</IndexLink>
        {' | '}
        <Link to="/quiz">Quiz</Link>
        {' | '}
        <Link to="/lessons">Lessons</Link>
      </div>
      {props.token ? <div className="user-name"><p>Logged in as &nbsp;</p><p>{props.userName}</p></div> : ""}
    </div>
      <br/>
      <h1>Learn Online</h1>
      {props.children}
  </div>
);

export default AppView;
