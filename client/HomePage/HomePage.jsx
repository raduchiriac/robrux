import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Map } from '../_components';
import { NavBar } from '../_components';

// import { userActions } from '../_actions';

class HomePage extends React.Component {
  componentDidMount() {
    // this.props.dispatch(userActions.getAll());
  }

  // handleDeleteUser(id) {
  //   return e => this.props.dispatch(userActions.delete(id));
  // }

  render() {
    // const { user, users } = this.props;
    return (
      <Fragment>
        <NavBar />
        <Map />
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return {
    user,
    users,
  };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
