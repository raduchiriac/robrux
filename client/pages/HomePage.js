import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Map from '../components/Map/Map';

class HomePage extends Component {
  render() {
    return (
      <Grid container>
        <Map />
      </Grid>
    );
  }
}

export default HomePage;
