import React, { useState, useEffect, useContext, Fragment } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Drawer from '@material-ui/core/Drawer';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ChatIcon from '@material-ui/icons/Chat';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { TranslationsContext } from '~/lib/contexts/TranslationsContext';
import Link from '~/lib/hocs/withLink';
import withApollo from '~/lib/hocs/withApollo';
import { GlobalContext } from '~/lib/contexts/GlobalContext';

const useStyles = props =>
  makeStyles(theme => ({
    appBar: {
      width: props.isMobile ? '100%' : `calc(100% - ${props.drawerWidth}px)`,
      marginLeft: props.isMobile ? '0' : props.drawerWidth,
    },
    drawer: {
      width: props.drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: props.drawerWidth,
    },
    swipeable: {
      width: props.drawerWidth,
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
  }))(props);

const HeaderAccountContainer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const { isiOS, drawerWidth } = useContext(GlobalContext).state;
  const { STRINGS } = useContext(TranslationsContext).state;
  const classes = useStyles({ drawerWidth, isMobile });

  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = open => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpenDrawer(open);
  };

  const ListItemLink = props => {
    return <ListItem button component="a" {...props} />;
  };

  const userMenu = (
    <Fragment>
      <List>
        {[
          { text: STRINGS.MY_PROFILE, href: '/profile/view/id', icon: <AccountCircleOutlinedIcon /> },
          { text: STRINGS.NEW_SERVICE, href: '/service/create', icon: <AddCircleOutlineIcon /> },
          { text: STRINGS.MESSAGES, href: '/', icon: <ChatIcon /> },
          { text: undefined },
          { text: STRINGS.LOGOUT, href: '/logout', icon: <ExitToAppIcon /> },
        ].map((link, index) =>
          link.text ? (
            <ListItemLink href={link.href} key={`listItem${index}`}>
              <ListItemIcon>{link.icon}</ListItemIcon>
              <ListItemText primary={link.text} secondary="" />
            </ListItemLink>
          ) : (
            <Divider key={`listItem${index}`} variant="middle" />
          )
        )}
      </List>
    </Fragment>
  );

  return (
    <div className={classes.grow}>
      {isMobile && (
        <SwipeableDrawer
          disableBackdropTransition={!isiOS}
          disableDiscovery={isiOS}
          open={openDrawer}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          className={classes.swipeable}
          classes={{
            paper: classes.swipeable,
          }}
        >
          <div role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
            {userMenu}
          </div>
        </SwipeableDrawer>
      )}
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          {isMobile && (
            <IconButton color="inherit" aria-label="open drawer" onClick={toggleDrawer(true)} edge="start" className="">
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap>
            <Link href="/" underline="none" color="inherit">
              {STRINGS.SITE_NAME}
            </Link>
          </Typography>
          <div className={classes.grow} />
        </Toolbar>
      </AppBar>
      {!isMobile && (
        <Drawer
          variant="permanent"
          anchor="left"
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          {userMenu}
        </Drawer>
      )}
    </div>
  );
};

export default withApollo(HeaderAccountContainer);
