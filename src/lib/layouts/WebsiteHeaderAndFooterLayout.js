import React, { Fragment } from 'react';
import Container from '@material-ui/core/Container';
import HeaderWebsiteContainer from '~/components/HeaderWebsiteContainer';
import { makeStyles } from '@material-ui/core/styles';
import Footer from '~/components/Footer/Footer';
import { useTheme } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(10),
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(8),
    },
  },
}));

export const WebsiteHeaderAndFooterLayout = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Fragment>
      <HeaderWebsiteContainer />
      <Container maxWidth="lg" className={classes.container}>
        {children}
        <Footer color={theme.palette.primary.main} />
      </Container>
    </Fragment>
  );
};
