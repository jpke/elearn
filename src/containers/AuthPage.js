import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/eLearnActions';
import Auth from '../components/Auth';

export const AuthPage = (props) => {
  return (
      <Auth
        register={props.actions.register}
        logIn={props.actions.logIn}
        logOut={props.actions.logOut}
      />
  );
};

// QuizPage.propTypes

function mapStateToProps(state) {
  return state.quizReducer.quizData.length > 0 ?
    {
      userName: state.authReducer.userName,
      _id: state.authReducer._id,
      token: state.authReducer.token
    }
  :
  {}
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthPage);
