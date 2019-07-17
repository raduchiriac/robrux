import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Map, { NavBar, SmallGigsList } from '../__TEMP/_components';
import gql from 'graphql-tag';

const searchGigs = string => {
  const gql = `
  {
    search(string: "${string}") {
      title
      description
      tags
      location {
        coordinates
      }
    }
  }
  `;
};

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
        <SmallGigsList />
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