import React, { useState, Fragment } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useMutation } from '@apollo/react-hooks';
import { LOGIN_USER } from '../lib/graphql/user.strings';
import useForm from '../lib/hooks/useForm';
import { LanguagesContext } from '../lib/contexts/LanguagesContext';
import Link from '../pages/src/Link';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(/static/robrux-full.jpeg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
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
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Form = props => {
  const { classes, errors, formErrors, values, handleChange, handleSubmit, STRINGS } = props;

  return (
    <Fragment>
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Adresa de mail"
          name="email"
          onChange={evt => handleChange(evt)}
          value={values.email || ''}
          error={(errors.email && true) || false}
          autoFocus
        />
        {errors.email && <Typography variant="subtitle2">{errors.email}</Typography>}

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Parola"
          type="password"
          onChange={evt => handleChange(evt)}
          error={(errors.password && true) || false}
          value={values.password || ''}
          id="password"
        />
        {errors.password && <Typography variant="subtitle2">{errors.password}</Typography>}

        <FormControlLabel control={<Checkbox value="remember" color="primary" />} label={STRINGS.LOGIN_REMEMBER} />
        <Box>
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
  const { STRINGS } = React.useContext(LanguagesContext).state;

  const _login = () => {
    loginUser({ variables: { input: values } });
  };

  const _validate = values => {
    let errors = {};
    if (!values.email) {
      errors.email = 'Email address is required';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    }
    return errors;
  };

  const [formValidated, setFormValidated] = useState(false);
  const [formErrors, setFormErrors] = useState('');
  const { values, errors, handleChange, handleSubmit } = useForm(_login, _validate);
  const [loginUser, { data }] = useMutation(LOGIN_USER, {
    onCompleted({ login }) {
      if (login.token) {
        setFormValidated(login.token);
      }
    },
    onError(error) {
      setFormErrors(error.graphQLErrors.map(e => e.message).join(','));
    },
  });

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <img src="/static/robrux.png" />
          </Avatar>
          {formValidated && '👏'}
          <Typography component="h1" variant="h5">
            ro:brux
          </Typography>
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
    </Grid>
  );
};

export { Form, LoginPageContainer };
