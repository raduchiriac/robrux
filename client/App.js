import React, { useContext } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import Login from './pages/user/Login';
import Register from './pages/user/Register';
import GigPage from './pages/GigPage';
import UserPage from './pages/user/UserPage';
import UserGigsPage from './pages/user/UserGigsPage';
import UserEditGigPage from './pages/user/UserEditGigPage';
import NotFoundPage from './pages/NotFoundPage';

import { DefaultTheme } from './_helpers/themes';
import DefaultLayoutRoute from './layouts/DefaultLayout';
import WithHeaderLayoutRoute from './layouts/WithHeaderLayout';

function App() {
  return (
    <Router>
      <MuiThemeProvider theme={DefaultTheme}>
        <CssBaseline />
        <Switch>
          <WithHeaderLayoutRoute path="/" component={HomePage} exact={true} />
          <WithHeaderLayoutRoute path="/service/:id" component={GigPage} />
          <WithHeaderLayoutRoute path="/user/:id/profile" component={UserPage} />
          <WithHeaderLayoutRoute path="/user/:id/gigs" component={UserGigsPage} />
          <WithHeaderLayoutRoute path="/user/:id/gig/:gig" component={UserEditGigPage} />
          <DefaultLayoutRoute path="/login" component={Login} />
          <DefaultLayoutRoute path="/register" component={Register} />
          <DefaultLayoutRoute component={NotFoundPage} />
        </Switch>
      </MuiThemeProvider>
    </Router>
  );
}

export default App;
