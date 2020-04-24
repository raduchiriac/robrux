import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Link from '~/lib/hocs/withLink';
import { GlobalContext } from '~/lib/contexts/GlobalContext';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { fade } from '@material-ui/core';

const useStyles = props =>
  makeStyles(theme => ({
    root: {
      backgroundColor: fade(props.color || theme.palette.background.default, 0.04),
      padding: theme.spacing(1),
      textAlign: 'center',
      borderRadius: theme.shape.borderRadius,
      color: fade(props.color || theme.palette.background.default, 0.4),
    },
    link: {
      color: props.color || theme.palette.background.default,
      margin: theme.spacing(0, 1),
    },
  }))(props);

const Footer = ({ color }) => {
  const { STRINGS } = useContext(GlobalContext).state;
  const classes = useStyles({ color });

  return (
    <Box mt={2} mb={1} component="div" className={classes.root}>
      <Link className={classes.link} href="/">
        {STRINGS.TERMS}
      </Link>
      |
      <Link className={classes.link} href="/">
        {STRINGS.FAQ}
      </Link>
      |
      <Link className={classes.link} href="/">
        {STRINGS.CONTACT}
      </Link>
      <Typography className={classes.link} component="span" variant="subtitle2">
        ©2020
      </Typography>
    </Box>
  );
};

Footer.propTypes = {};

export default Footer;
