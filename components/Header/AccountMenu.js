import React, { useRef, useState, useContext, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { TranslationsContext } from '~/lib/contexts/TranslationsContext';
import Link from '~/lib/hocs/withLink';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    zIndex: 20,
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    padding: 0,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  internalBadge: {
    position: 'absolute',
    right: theme.spacing(2),
    top: '50%',
  },
  link: {
    position: 'relative',
    display: 'block',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  name: {
    background: 'white',
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius * 3,
    '&:empty': {
      display: 'none',
    },
  },
  avatar: {
    width: 64,
    height: 64,
    boxShadow: theme.shadows[5],
    marginBottom: theme.spacing(1),
  },
}));

const AccountMenu = ({ className }) => {
  const classes = useStyles();
  const { STRINGS } = useContext(TranslationsContext).state;
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  // TODO: usePrevious()
  const prevOpen = React.useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  // https://www.iconfinder.com/avatars-smiley-icons?page=3&price=free
  // https://www.iconfinder.com/iconsets/user-pictures

  return (
    <div className={clsx(classes.root, className)}>
      <Badge color="secondary" badgeContent={1} anchorOrigin={{ horizontal: 'right', vertical: 'top' }}>
        <Button
          ref={anchorRef}
          aria-controls={open ? 'account-menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          className={classes.button}
        >
          <Avatar className={classes.avatar} alt="" src="/avatars/user.svg" />
        </Button>
      </Badge>
      <Typography className={classes.name} variant="subtitle2"></Typography>
      <Popper open={open} placement="bottom-end" anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps }) => (
          <Grow {...TransitionProps} style={{ transformOrigin: 'center top' }}>
            <Paper elevation={6}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="account-menu-list-grow" onKeyDown={handleListKeyDown}>
                  <Link href="/news" className={classes.link}>
                    <Badge variant="dot" className={classes.internalBadge} color="secondary" badgeContent={1}></Badge>
                    <MenuItem>{STRINGS.NEWS_NOW}</MenuItem>
                  </Link>
                  <Link href="/profile/view/id" className={classes.link}>
                    <MenuItem>{STRINGS.MY_PROFILE}</MenuItem>
                  </Link>
                  <Divider />
                  <Link href="/login" className={classes.link}>
                    <MenuItem>{STRINGS.LOGIN_NOW}</MenuItem>
                  </Link>
                  <Link href="/register" className={classes.link}>
                    <MenuItem>{STRINGS.REGISTER_NOW}</MenuItem>
                  </Link>
                  <Link href="/logout" className={classes.link}>
                    <MenuItem>{STRINGS.LOGOUT}</MenuItem>
                  </Link>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export default AccountMenu;
