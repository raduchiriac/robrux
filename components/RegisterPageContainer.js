import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import useForm from '../lib/hooks/useForm';
import { LanguagesContext } from '../lib/contexts/LanguagesContext';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_USER } from '../lib/graphql/user.strings';
import Container from '@material-ui/core/Container';
import Link from '../pages/src/Link';

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

const Form = props => {
  const { classes, errors, formErrors, values, handleChange, handleSubmit, STRINGS } = props;

  return (
    <Fragment>
      <Avatar className={classes.avatar}>
        <img src="/static/robrux.png" />
      </Avatar>
      <Typography component="h1" variant="h5">
        {STRINGS.SITE_NAME}
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
              onChange={evt => handleChange(evt)}
              value={values.firstName || ''}
              error={(errors.firstName && true) || false}
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
              onChange={evt => handleChange(evt)}
              value={values.lastName || ''}
              error={(errors.lastName && true) || false}
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
              onChange={evt => handleChange(evt)}
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
              onChange={evt => handleChange(evt)}
              value={values.password || ''}
              error={(errors.password && true) || false}
              autoComplete="off"
            />
            {errors.password && <Typography variant="subtitle2">{errors.password}</Typography>}
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="confirm-password"
              label="Confirmă parola"
              type="password"
              id="confirm-password"
              autoComplete="off"
            />
            {errors.password && <Typography variant="subtitle2">{errors['confirm-password']}</Typography>}
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox value="acceptTerms" color="primary" required />}
              label={STRINGS.REGISTER_ACC_TERMS}
            />
          </Grid>
        </Grid>
        <Typography>{formErrors}</Typography>
        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
          {STRINGS.REGISTER_NOW}
        </Button>
        <Grid container justify="flex-end">
          <Grid item>
            <Link href="/login" variant="body2">
              {STRINGS.REGISTER_ALREADY}
            </Link>
          </Grid>
        </Grid>
      </form>
    </Fragment>
  );
};

const EmailSent = props => {
  const { STRINGS } = props;
  return (
    <Typography component="h1" align="center" variant="h5">
      {STRINGS.REGISTER_EMAIL_SUCC}
    </Typography>
  );
};

export default function RegisterPageContainer() {
  const classes = useStyles();
  const { STRINGS } = React.useContext(LanguagesContext).state;

  const _register = () => {
    createUser({ variables: { input: values } });
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

  const [formValidated, setFormValidated] = useState(false);
  const [formErrors, setFormErrors] = useState('');
  const { values, errors, handleChange, handleSubmit } = useForm(_register, _validate);
  const [createUser, { data }] = useMutation(CREATE_USER, {
    onCompleted({ register }) {
      if (register._id) {
        setFormValidated(true);
      }
    },
    onError(error) {
      setFormErrors(error.message);
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        {formValidated ? (
          <EmailSent STRINGS={STRINGS} />
        ) : (
          <Form
            classes={classes}
            errors={errors}
            formErrors={formErrors}
            values={values}
            STRINGS={STRINGS}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          ></Form>
        )}
      </div>
    </Container>
  );
}
