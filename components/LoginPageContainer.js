import React, { useState, useContext, Fragment } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import Router from 'next/router';
import { localStorageSaveUser } from '~/lib/hocs/withAuth';
import { LOGIN_USER } from '~/lib/graphql/user.strings';
import { TranslationsContext } from '~/lib/contexts/TranslationsContext';
import useForm from '~/lib/hooks/useForm';
import Link from '~/lib/hocs/withLink';

import './LoginPageContainer.scss';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(/backgrounds/robrux-full.jpeg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'grayscale(1)',
  },
  paperContainer: {
    zIndex: 1,
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    width: 80,
    height: 80,
    backgroundColor: 'transparent',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  formErrors: {},
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Form = props => {
  const { classes, errors, formErrors, values, handleChange, handleSubmit, STRINGS } = props;

  return (
    <Fragment>
      <form className={classes.form} noValidate onSubmit={evt => handleSubmit(evt)}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label={STRINGS.LOGIN_EMAIL}
          name="email"
          autoComplete="email"
          onChange={evt => handleChange(evt)}
          value={values.email || ''}
          error={(errors.email && true) || false}
          autoFocus
          helperText={errors.email}
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label={STRINGS.LOGIN_PASS}
          type="password"
          autoComplete="current-password"
          onChange={evt => handleChange(evt)}
          error={(errors.password && true) || false}
          value={values.password || ''}
          id="password"
          helperText={errors.password}
        />

        {/* TODO: Implement Remember Me (extend cookie life?) */}
        <FormControlLabel control={<Checkbox value="remember" color="primary" />} label={STRINGS.LOGIN_REMEMBER} />
        <Box color="error.main" className={classes.formErrors}>
          <Typography>{formErrors}</Typography>
        </Box>
        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
          Login
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="/forgot" variant="body2">
              {STRINGS.LOGIN_FORGOT}
            </Link>
          </Grid>
          <Grid item>
            <Link href="/register" variant="body2">
              {STRINGS.LOGIN_NO_ACCOUNT}
            </Link>
          </Grid>
        </Grid>
      </form>
    </Fragment>
  );
};

const LoginPageContainer = () => {
  const classes = useStyles();
  const { STRINGS } = useContext(TranslationsContext).state;

  const _login = () => {
    loginUser({ variables: { input: values } });
  };

  const _validate = values => {
    let errors = {};
    if (!values.email) {
      errors.email = STRINGS.FORM_EMAIL_REQUIRED;
    }
    if (!values.password) {
      errors.password = STRINGS.FORM_PASSWORD_REQUIRED;
    }
    return errors;
  };

  const apolloClient = useApolloClient();
  const { values, errors, handleChange, handleSubmit } = useForm(_login, _validate);
  const [formErrors, setFormErrors] = useState('');
  const [loginUser, { data }] = useMutation(LOGIN_USER, {
    onCompleted({ login }) {
      if (login._id) {
        // Force a reload of all the current queries now that the user is logged
        apolloClient.cache.reset().then(() => {
          delete login['__typename'];
          localStorageSaveUser(login);
          Router.push({ pathname: '/' });
        });
      }
    },
    onError(error) {
      setFormErrors((error.graphQLErrors.length && error.graphQLErrors.map(e => e.message).join(',')) || error.message);
    },
  });

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      {/* <Slide direction="left" in={true}> */}
      <Grid className={classes.paperContainer} item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Link href="/" underline="none" color="inherit" align="center">
            <Avatar className={classes.avatar}>
              <img src="/robrux.png" alt="Login Page" />
            </Avatar>
            <Typography component="h1" variant="h5">
              {STRINGS.SITE_NAME}
            </Typography>
          </Link>
          <Form
            classes={classes}
            errors={errors}
            formErrors={formErrors}
            values={values}
            STRINGS={STRINGS}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </div>
      </Grid>
      {/* </Slide> */}
    </Grid>
  );
};

export { Form, LoginPageContainer };
