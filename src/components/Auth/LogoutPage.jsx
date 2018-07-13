import { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router';

class LogoutPage extends Component {
  componentWillMount() {
    this.props.onLogout();
  }

  render() {
    return null;
  }
}

export default withRouter(connect()(LogoutPage))