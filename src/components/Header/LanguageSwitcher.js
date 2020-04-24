import React, { useContext } from 'react';
import { withStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import NoSsr from '@material-ui/core/NoSsr';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import LanguageIcon from '@material-ui/icons/Translate';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { GlobalContext } from '~/lib/contexts/GlobalContext';

const styles = theme => ({
  root: {
    display: 'flex',
    position: 'relative',
  },
  language: {
    margin: theme.spacing(0, 0.5, 0, 1),
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
  expandIcon: {},
  menu: {
    top: `${theme.spacing(5)}px !important`,
  },
});

const LanguageSwitcher = ({ classes }) => {
  const [languageMenu, setLanguageMenu] = React.useState(null);
  const { USER_LANG, LANGUAGES_LABEL } = useContext(GlobalContext).state;
  const dispatchGlobally = useContext(GlobalContext).dispatchGlobally;
  const handleLanguageIconClick = e => {
    setLanguageMenu(e.currentTarget);
  };
  const handleMenuItemClick = e => {
    e.preventDefault();
    dispatchGlobally({ type: 'set-language', payload: e.currentTarget.lang });
    handleLanguageMenuClose();
  };
  const handleLanguageMenuClose = e => {
    setLanguageMenu(null);
  };

  return (
    <Box component="div" className={classes.root}>
      <Tooltip title="" enterDelay={300}>
        <Button
          color="inherit"
          aria-owns={languageMenu ? 'language-menu' : undefined}
          aria-haspopup="true"
          aria-label={''}
          onClick={handleLanguageIconClick}
        >
          <LanguageIcon />
          <span className={classes.language}>{LANGUAGES_LABEL.filter(language => language.code === USER_LANG)[0].code}</span>
          <ExpandMoreIcon fontSize="small" className={classes.expandIcon} />
        </Button>
      </Tooltip>
      <NoSsr>
        <Menu
          className={classes.menu}
          id="language-menu"
          anchorEl={languageMenu}
          open={Boolean(languageMenu)}
          onClose={handleLanguageMenuClose}
        >
          {LANGUAGES_LABEL.map(language => (
            <MenuItem
              data-no-link="true"
              key={language.code}
              selected={USER_LANG === language.code}
              onClick={e => handleMenuItemClick(e)}
              lang={language.code}
              hrefLang={language.code}
            >
              {language.text}
            </MenuItem>
          ))}
        </Menu>
      </NoSsr>
    </Box>
  );
};

export default withStyles(styles)(LanguageSwitcher);
