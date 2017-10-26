import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions/eLearnActions";
import UpdatePasswordView from "../components/UpdatePasswordView";

//container for AuthView, adds necessary data to event calls triggered by AdminView
//allows user to register, log in or out and select course
class UpdatePasswordContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { update: false };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.passwordUpdated) this.setState({ update: false });
    this.props.actions.passwordUpdated(false);
  }

  //toggles between ask and update views
  toggleView() {
    this.setState({ update: !this.state.update });
  }
  updatePassword(event) {
    event.preventDefault();
    const form = event.target.elements;
    this.props.actions.updatePassword(
      this.props.token,
      this.props.userId,
      form.oldPassword.value,
      form.password.value
    );
  }

  render() {
    return (
      <div>
        {this.state.update
          ? <UpdatePasswordView
              toggleView={this.toggleView.bind(this)}
              updatePassword={this.updatePassword.bind(this)}
            />
          : <button onClick={this.toggleView.bind(this)} className="authButton">
              Update Password
            </button>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.authReducer.token,
    passwordUpdated: state.authReducer.passwordUpdated,
    userId: state.authReducer.userId
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  UpdatePasswordContainer
);
