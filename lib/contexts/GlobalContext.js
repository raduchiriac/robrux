import React, { useReducer, createContext, useEffect } from 'react';
import lscache from 'lscache';
import i18n from '~/lib/constants/I18N';

const GlobalContext = createContext();

let initialState = {
  showMap: true,
  drawerWidth: 220,
  LANGUAGES_LABEL: Object.keys(i18n).map(l => ({ code: l, text: i18n[l].LANG_LABEL })),
  USER_LANG: 'ro',
  STRINGS: i18n['ro'],
  isiOS: process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent),
};

let reducer = (state, action) => {
  switch (action.type) {
    case 'reset':
      return initialState;
    case 'toggle-map':
      return { ...state, showMap: action.payload };
    case 'set-language':
      return { ...state, USER_LANG: action.payload, STRINGS: i18n[action.payload] };
    default:
      return state;
  }
};

function GlobalContextProvider({ children }) {
  let [state, dispatchGlobally] = useReducer(reducer, initialState);
  let value = { state, dispatchGlobally };

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
}

const GlobalContextConsumer = GlobalContext.Consumer;
export { GlobalContext, GlobalContextProvider, GlobalContextConsumer };
