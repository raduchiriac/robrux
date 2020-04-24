import React, { useReducer, createContext, useEffect } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { LightTheme } from '~/lib/themes/light-theme';
import { DarkTheme } from '~/lib/themes/dark-theme';
import { Helmet } from 'react-helmet';
import SITE_NAME from '~/lib/constants/SITENAME';
import CUSTOM_PALETTE from '~/lib/constants/COLOR_PALETTE';
import i18n from '~/lib/constants/I18N';

const GlobalContext = createContext();

let initialState = {
  THEME: 'light',
  USER_LANG: 'ro',
  STRINGS: i18n['ro'],
  showMap: true,
  drawerWidth: 220,
  isiOS: process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent),
  LANGUAGES_LABEL: Object.keys(i18n).map(l => ({ code: l, text: i18n[l].LANG_LABEL })),
};

let reducer = (state, action) => {
  switch (action.type) {
    case 'reset':
      return initialState;
    case 'toggle-map':
      return { ...state, showMap: !state.showMap };
    case 'set-language':
      return { ...state, USER_LANG: action.payload, STRINGS: i18n[action.payload] };
    case 'set-theme':
      return { ...state, THEME: action.payload };
    default:
      return state;
  }
};

function GlobalContextProvider({ children }) {
  let [state, dispatchGlobally] = useReducer(reducer, initialState);
  let value = { state, dispatchGlobally };

  return (
    <GlobalContext.Provider value={value}>
      <ThemeProvider theme={(value.state.THEME == 'dark' && DarkTheme) || LightTheme}>
        <Helmet
          htmlAttributes={{ lang: value.state.USER_LANG }}
          defaultTitle={SITE_NAME}
          titleTemplate={`%s | ${SITE_NAME}`}
          meta={[
            {
              name: 'viewport',
              content: 'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no',
            },
            { name: 'description', content: value.state.STRINGS.SITE_DESCRIPTION },
            { name: 'theme-color', content: CUSTOM_PALETTE.primary },
            { name: 'msapplication-navbutton-color', content: CUSTOM_PALETTE.primary },
            { name: 'apple-mobile-web-app-status-bar-style', content: CUSTOM_PALETTE.primary },
          ]}
        />
        {children}
      </ThemeProvider>
    </GlobalContext.Provider>
  );
}

const GlobalContextConsumer = GlobalContext.Consumer;
export { GlobalContext, GlobalContextProvider, GlobalContextConsumer };
