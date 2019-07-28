import React, { Component } from 'react';
// import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Map from '../components/Map/Map';
// import SettingsContext from '../_helpers/context/Settings/SettingsContext';

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
