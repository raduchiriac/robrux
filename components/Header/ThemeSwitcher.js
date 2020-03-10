import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip, IconButton } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';

const ThemeSwitcher = props => {
  // const changeTheme = useChangeTheme();
  const theme = useTheme();
  const handleTogglePaletteType = () => {
    const paletteType = theme.palette.type === 'light' ? 'dark' : 'light';
  };

  return (
    <Tooltip title="" enterDelay={300}>
      <IconButton color="inherit" onClick={() => {}} aria-label={''}>
        {theme.palette.type === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
      </IconButton>
    </Tooltip>
  );
};

ThemeSwitcher.propTypes = {};

export default ThemeSwitcher;
