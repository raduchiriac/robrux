import React, { useContext, Fragment } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import HeaderAccountContainer from '~/components/HeaderAccountContainer';
import { GlobalContext } from '~/lib/contexts/GlobalContext';

const useStyles = props =>
  makeStyles(theme => ({
    container: {
      width: props.isMobile ? '100%' : `calc(100% - ${props.drawerWidth}px)`,
      marginLeft: props.isMobile ? 0 : props.drawerWidth,
      marginTop: 80,
    },
  }))(props);

export const AccountLayout = ({ children }) => {
  const { drawerWidth } = useContext(GlobalContext).state;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const classes = useStyles({ drawerWidth, isMobile });

  return (
    <Fragment>
      <HeaderAccountContainer />
      <Grid container className={classes.container}>
        {children}
      </Grid>
    </Fragment>
  );
};
