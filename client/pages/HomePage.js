import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Map from '../components/Map/Map';
import SettingsContext from '../context/Settings/SettingsContext';

const styles = theme => ({
  root: {
    flex: 1,
  },
});

const HomePage = ({ classes, align = 'right' }) => {
  const context = useContext(SettingsContext);
  const [open, setOpen] = useState(false);
  return (
    <Grid container>
      <Map />
    </Grid>
  );
};

HomePage.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(HomePage);
