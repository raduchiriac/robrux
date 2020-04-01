import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Tooltip, IconButton } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import { GlobalContext } from '~/lib/contexts/GlobalContext';

const ThemeSwitcher = props => {
  const theme = useTheme();
  const dispatchGlobally = useContext(GlobalContext).dispatchGlobally;

  const handleTogglePaletteType = () => {
    dispatchGlobally({ type: 'set-theme', payload: theme.palette.type == 'light' ? 'dark' : 'light' });
  };

  return (
    <Tooltip title="" enterDelay={300}>
      <IconButton color="inherit" onClick={() => handleTogglePaletteType()} aria-label="theme-switch">
        {theme.palette.type === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
      </IconButton>
    </Tooltip>
  );
};

ThemeSwitcher.propTypes = {};

export default ThemeSwitcher;
