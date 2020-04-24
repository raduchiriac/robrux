import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { GlobalContextProvider } from '~/lib/contexts/GlobalContext';
import { StylesProvider } from '@material-ui/styles';

import { LightTheme } from '~/lib/themes/light-theme';

const StylesDecorator = storyFn => (
  <GlobalContextProvider>
    <StylesProvider injectFirst>
      <CssBaseline />
      <MuiThemeProvider theme={LightTheme}>{storyFn()}</MuiThemeProvider>
    </StylesProvider>
  </GlobalContextProvider>
);

export default StylesDecorator;
