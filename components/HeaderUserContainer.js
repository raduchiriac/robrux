import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { LanguagesContext } from '~/lib/contexts/LanguagesContext';
import Link from '~/lib/hocs/withLink';
import withApollo from '~/lib/hocs/withApollo';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const HeaderUserContainer = () => {
  const classes = useStyles();

  const { STRINGS } = useContext(LanguagesContext).state;
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = open => {
    // if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    //   return;
    // }
    // setOpenDrawer(true);
  };

  return (
    <div className={classes.grow}>
      <SwipeableDrawer open={openDrawer} onClose={() => toggleDrawer(false)} onOpen={() => toggleDrawer(true)}>
        <div className={classes.list} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
          do-it
        </div>
      </SwipeableDrawer>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" onClick={() => toggleDrawer()} edge="start" className="">
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            <Link href="/" underline="none" color="inherit">
              {STRINGS.SITE_NAME}
            </Link>
          </Typography>
          <div className={classes.grow} />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withApollo(HeaderUserContainer);
