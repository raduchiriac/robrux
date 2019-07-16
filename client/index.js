import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import SettingsProvider from './context/Settings/SettingsProvider';
import App from './App.js';
import client from './_apollo';

ReactDOM.render(
  <ApolloProvider client={client}>
    <SettingsProvider>
      <App />
    </SettingsProvider>
  </ApolloProvider>,
  document.getElementById('app')
);
