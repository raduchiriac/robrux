import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { StylesProvider } from '@material-ui/styles';

import { LightTheme } from '../lib/themes/light-theme';

const StylesDecorator = storyFn => (
  <StylesProvider injectFirst>
    <CssBaseline />
    <MuiThemeProvider theme={LightTheme}>{storyFn()}</MuiThemeProvider>
  </StylesProvider>
);

export default StylesDecorator;
