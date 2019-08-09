import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import useForm from '../lib/hooks/useForm';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_USER } from '../lib/graphql/user.strings';
import Container from '@material-ui/core/Container';
import Link from './src/Link';
import { DefaultLayout } from '../layouts/DefaultLayout';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  subtitle2: {
    color: theme.palette.error.main,
  },
  'input--has_errors': {
    borderColor: theme.palette.error.main,
  },
}));

export default function SignUp() {
  const classes = useStyles();

  const _register = () => {
    console.log(createUser({ variables: { input: values } }));
  };
  const _validate = values => {
    let errors = {};
    if (!values.email) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email address is invalid';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 3) {
      errors.password = 'Password must be 3 or more characters';
    }
    return errors;
  };
  const { values, errors, handleChange, handleSubmit } = useForm(_register, _validate);
  const [createUser, { data }] = useMutation(CREATE_USER);

  return (
    <DefaultLayout>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <img src="/static/robrux.png" />
          </Avatar>
          <Typography component="h1" variant="h5">
            Înregistrare
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="off"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="Prenume"
                  onChange={handleChange}
                  value={values.firstName}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Nume"
                  name="lastName"
                  onChange={handleChange}
                  value={values.lastName}
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Adresa de mail"
                  name="email"
                  onChange={handleChange}
                  value={values.email || ''}
                  error={(errors.email && true) || false}
                  autoComplete="off"
                />
                {errors.email && <Typography variant="subtitle2">{errors.email}</Typography>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Parola"
                  type="password"
                  id="password"
                  onChange={handleChange}
                  value={values.password}
                  error={(errors.password && true) || false}
                  autoComplete="off"
                />
                {errors.password && <Typography variant="subtitle2">{errors.password}</Typography>}
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" required />}
                  label="Regulament"
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
              Continua
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Am deja un cont. Login
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </DefaultLayout>
  );
}
