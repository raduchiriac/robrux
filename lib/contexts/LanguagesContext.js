import React, { useReducer } from 'react';
import i18n from '../constants/I18N';

// Export with a default language
const initialState = {
  STRINGS: i18n['ro'],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'reset':
      return initialState;
    case 'set-language':
      return { ...state, STRINGS: i18n[action.payload] };
  }
};

const LanguagesContext = React.createContext();

const LanguagesContextProvider = props => {
  let [state, dispatchLanguage] = React.useReducer(reducer, initialState);
  let value = { state, dispatchLanguage };

  return <LanguagesContext.Provider value={value}>{props.children}</LanguagesContext.Provider>;
};

const LanguagesContextConsumer = LanguagesContext.Consumer;
export { LanguagesContext, LanguagesContextConsumer, LanguagesContextProvider };
