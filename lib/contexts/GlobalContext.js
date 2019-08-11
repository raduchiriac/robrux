// https://dev.to/oieduardorabelo/react-hooks-how-to-create-and-update-contextprovider-1f68

import React, { useReducer } from 'react';

let GlobalContext = React.createContext();

let initialState = {
  showMap: false,
};

let reducer = (state, action) => {
  switch (action.type) {
    case 'reset':
      return initialState;
    case 'toggle-map':
      return { ...state, showMap: action.payload };
  }
};

function GlobalContextProvider(props) {
  let [state, dispatchGlobalContext] = React.useReducer(reducer, initialState);
  let value = { state, dispatchGlobalContext };

  return <GlobalContext.Provider value={value}>{props.children}</GlobalContext.Provider>;
}

let GlobalContextConsumer = GlobalContext.Consumer;

export { GlobalContext, GlobalContextProvider, GlobalContextConsumer };
