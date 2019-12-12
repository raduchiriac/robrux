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
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { LanguagesContext } from '~/lib/contexts/LanguagesContext';
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
  const { STRINGS } = useContext(LanguagesContext).state;
  const classes = useStyles({ drawerWidth, isMobile });

  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = open => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpenDrawer(open);
  };

  const userMenu = (
    <Fragment>
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
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
