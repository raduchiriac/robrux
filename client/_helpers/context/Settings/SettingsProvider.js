import React, { useState } from 'react';
import SettingsContext from './SettingsContext';

const storage = {
  getItem(key) {
    if (localStorage) {
      return localStorage.getItem(key);
    }
  },
  setItem(key, value) {
    if (localStorage) {
      return localStorage.setItem(key, value);
    }
  },
};

const SettingsProvider = props => {
  const [darkMode, setDarkMode] = useState(storage.getItem('darkMode') === 'true');
  const onSetDarkMode = darkMode => {
    setDarkMode(darkMode);
    storage.setItem('darkMode', darkMode);
  };
  return (
    <SettingsContext.Provider
      value={{
        darkMode,
        onSetDarkMode,
      }}
    >
      {props.children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
