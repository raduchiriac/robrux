import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import client from './_helpers/apollo';
import SettingsProvider from './_helpers/context/Settings/SettingsProvider';
import App from './App.js';

ReactDOM.render(
  <ApolloProvider client={client}>
    <SettingsProvider>
      <App />
    </SettingsProvider>
  </ApolloProvider>,
  document.getElementById('app')
);
