import React, { useReducer } from 'react';
import i18n from '~/lib/constants/I18N';

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

const TranslationsContext = React.createContext();

const TranslationsContextProvider = props => {
  let [state, dispatchLanguage] = React.useReducer(reducer, initialState);
  let value = { state, dispatchLanguage };

  return <TranslationsContext.Provider value={value}>{props.children}</TranslationsContext.Provider>;
};

const TranslationsContextConsumer = TranslationsContext.Consumer;
export { TranslationsContext, TranslationsContextConsumer, TranslationsContextProvider };
