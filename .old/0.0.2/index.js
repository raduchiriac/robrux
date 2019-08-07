import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import client from './_helpers/apollo';
import App from './App.js.js';

ReactDOM.render(
  <ApolloProvider client={client}>
      <App />
    </SettingsProvider>
  document.getElementById('app')
);
