import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import LinkOffIcon from '@material-ui/icons/LinkOff';
import { GlobalContext } from '~/lib/contexts/GlobalContext';

const useStyles = makeStyles(theme => ({
  paper: {
    textAlign: 'center',
    padding: theme.spacing(2),
    '& > *': {
      margin: theme.spacing(3),
    },
  },
  icon: {
    fontSize: '4em',
    display: 'block',
    margin: 'auto',
  },
}));

const Error404 = () => {
  const classes = useStyles();
  const { STRINGS } = useContext(GlobalContext).state;

  return (
    <Container>
      <Paper className={classes.paper}>
        <Typography color="inherit" component="h4" gutterBottom>
          <LinkOffIcon color="primary" className={classes.icon} />
        </Typography>

        <Typography variant="h5" color="textSecondary">
          {STRINGS.ERROR_404}
        </Typography>
        <Button variant="contained" color="primary" href="/">
          {STRINGS.HOME}
        </Button>
      </Paper>
    </Container>
  );
};

export default Error404;
