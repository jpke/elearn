import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {badResponse} from '../actions/eLearnActions';
import AppView from '../components/AppView';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class AppContainer extends Component {
  static propTypes = {
    children: PropTypes.element
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <AppView
          errorMessage={this.props.errorMessage}
          clearErrorMessage={this.props.clearErrorMessage}
          userName={this.props.userName}
          token={this.props.token}
          children={this.props.children}
        />
    );
  }
}

function mapStateToProps(state) {
  return {
    userName: state.authReducer.userName,
    token: state.authReducer.token,
    errorMessage: state.authReducer.errorMessage
  }
}

function mapDispatchToProps(dispatch) {
  return {
    clearErrorMessage: () => dispatch(badResponse(""))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);
