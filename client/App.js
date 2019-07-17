import React, { useContext } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { DefaultTheme, DarkTheme } from './_helpers/themes';
import SettingsContext from './_helpers/context/Settings/SettingsContext';
import HomePage from './pages/HomePage';

function App() {
  // const context = useContext(SettingsContext);
  const theme = false ? DarkTheme : DefaultTheme;

  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Route path="/" component={HomePage} />
      </MuiThemeProvider>
    </Router>
  );
}

export default App;
