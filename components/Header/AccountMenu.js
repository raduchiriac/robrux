import React, { useRef, useState, useContext, useEffect, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import withApollo from '~/lib/hocs/withApollo';
import { useQuery } from '@apollo/react-hooks';
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
import { GlobalContext } from '~/lib/contexts/GlobalContext';
import { UserContext } from '~/lib/contexts/UserContext';
import { GET_USER_INFO } from '~/lib/graphql/user.strings';
import Link from '~/lib/hocs/withLink';

const useStyles = props =>
  makeStyles(theme => ({
    root: {
      display: 'flex',
      zIndex: 20,
      flexDirection: 'column',
      alignItems: 'center',
    },
    badge: {
      alignSelf: 'flex-end',
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
      color: theme.palette.primary.main,
      '&:hover': {
        textDecoration: 'none',
      },
    },
    name: {
      position: 'absolute',
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.action.active,
      transition: theme.transitions.create('opacity'),
      opacity: props.hovered ? 1 : 0,
      visibility: props.hovered ? 'visible' : 'hidden',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(1),
      borderRadius: theme.shape.borderRadius,
      '&:empty': {
        display: 'none',
      },
      right: 0,
      top: theme.spacing(9),
      textAlign: 'right',
      minWidth: theme.spacing(9),
    },
    avatar: {
      width: 64,
      height: 64,
      boxShadow: theme.shadows[5],
      marginBottom: theme.spacing(1),
    },
  }))(props);

const AccountMenu = ({ className }) => {
  const { STRINGS } = useContext(GlobalContext).state;
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const classes = useStyles({ hovered });
  const anchorRef = useRef(null);
  const { loading, error, data } = useQuery(GET_USER_INFO, { skip: !user._id, variables: { id: user._id } });

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
  const prevOpen = useRef(open);
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
      <Badge
        className={classes.badge}
        color="secondary"
        badgeContent={1}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <Button
          ref={anchorRef}
          aria-controls={open ? 'account-menu-list-grow' : undefined}
          aria-label="account"
          aria-haspopup="true"
          onClick={handleToggle}
          className={classes.button}
        >
          <Avatar
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={classes.avatar}
            alt=""
            src={(!loading && user._id && data?.userInfo?.avatar) || '/avatars/user.svg'}
          />
        </Button>
      </Badge>
      {!loading && user._id && (
        <Typography className={classes.name} variant="subtitle2">
          {`${data?.userInfo?.firstName} ${data?.userInfo?.lastName}`}
        </Typography>
      )}
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
                  {!loading && user._id && (
                    <Link href={`/profile/view`} className={classes.link}>
                      <MenuItem>{STRINGS.MY_PROFILE}</MenuItem>
                    </Link>
                  )}
                  <Divider />
                  {!loading && !user._id && (
                    <div>
                      <Link href="/login" className={classes.link}>
                        <MenuItem>{STRINGS.LOGIN_NOW}</MenuItem>
                      </Link>
                      <Link href="/register" className={classes.link}>
                        <MenuItem>{STRINGS.REGISTER_NOW}</MenuItem>
                      </Link>
                    </div>
                  )}
                  {!loading && user._id && (
                    <Link href="/logout" className={classes.link}>
                      <MenuItem>{STRINGS.LOGOUT}</MenuItem>
                    </Link>
                  )}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export default withApollo(AccountMenu);
