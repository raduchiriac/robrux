import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import defaultTheme from './themes/default';
import darkTheme from './themes/dark';
import HomePage from './pages/HomePage';
import SettingsContext from './context/Settings/SettingsContext';

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
  },
  paper: {
    width: 350,
    height: 400,
  },
});

function App({ classes }) {
  const context = useContext(SettingsContext);

  const theme = context.darkMode ? darkTheme : defaultTheme;
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <HomePage />
    </MuiThemeProvider>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
