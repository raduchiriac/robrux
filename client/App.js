import React, { useContext } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './pages/Header';
import HomePage from './pages/HomePage';
import GigPage from './pages/GigPage';
import UserPage from './pages/UserPage';
import UserGigsPage from './pages/UserGigsPage';
import UserEditGigPage from './pages/UserEditGigPage';
import NotFoundPage from './pages/NotFoundPage';

import { DefaultTheme } from './_helpers/themes';

function App() {
  return (
    <Router>
      <MuiThemeProvider theme={DefaultTheme}>
        <CssBaseline />
        <Header />
        <Container maxWidth="lg">
          <Switch>
            <Route path="/" component={HomePage} exact={true} />
            <Route path="/service/:id" component={GigPage} />
            <Route path="/user/:id/profile" component={UserPage} />
            <Route path="/user/:id/gigs" component={UserGigsPage} />
            <Route path="/user/:id/gig/:gig" component={UserEditGigPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Container>
      </MuiThemeProvider>
    </Router>
  );
}

export default App;
