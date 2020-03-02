import React, { useReducer, createContext } from 'react';

let GlobalContext = createContext();

let initialState = {
  showMap: true,
  drawerWidth: 220,
  language: 'ro',
  isiOS: process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent),
};

let reducer = (state, action) => {
  switch (action.type) {
    case 'reset':
      return initialState;
    case 'set-language':
      return { ...state, language: action.payload };
    case 'toggle-map':
      return { ...state, showMap: action.payload };
  }
};

function GlobalContextProvider({ children }) {
  let [state, dispatchGlobalContext] = useReducer(reducer, initialState);
  let value = { state, dispatchGlobalContext };

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
}

let GlobalContextConsumer = GlobalContext.Consumer;

export { GlobalContext, GlobalContextProvider, GlobalContextConsumer };
