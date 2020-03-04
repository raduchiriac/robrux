import React, { useState, useContext, Fragment } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useMutation } from '@apollo/react-hooks';
import Box from '@material-ui/core/Box';
import CheckboxWithLink from '~/components/FormElements/CheckboxWithLink';
import DialogHeight from '~/components/FormElements/DialogHeight';
import loadable from '@loadable/component';
import { Helmet } from 'react-helmet';
import withApollo from '~/lib/hocs/withApollo';
import useForm from '~/lib/hooks/useForm';
import { TranslationsContext } from '~/lib/contexts/TranslationsContext';
import { CREATE_USER } from '~/lib/graphql/user.strings';
import Link from '~/lib/hocs/withLink';

const useStyles = makeStyles(theme => ({
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

const Form = ({ classes, errors, formErrors, values, handleChange, handleSubmit, STRINGS }) => {
  const [openModal, setOpenModal] = useState(false);
  const [whichModal, setWhichModal] = useState('');

  // TODO: Make this dynamic somehow
  const Terms = loadable(() => import('./terms/ro'));
  const Privacy = loadable(() => import('./privacy/ro'));

  const handleClose = () => {
    setOpenModal(false);
    setWhichModal('');
  };

  const handleLinkClick = (evt, whichModal) => {
    evt.preventDefault();
    setWhichModal(whichModal);
    setOpenModal(true);
  };

  return (
    <Fragment>
      <Helmet title={STRINGS.REGISTER_NOW} />

      <Avatar className={classes.avatar}>
        <img src="/robrux.png" alt="Register Page" />
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
              label="_FIRST"
              onChange={evt => handleChange(evt)}
              value={values.firstName || ''}
              error={(errors.firstName && true) || false}
              autoFocus
            />
            {errors.firstName && <Typography variant="subtitle2">{errors.firstName}</Typography>}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="lastName"
              label="_LAST"
              name="lastName"
              onChange={evt => handleChange(evt)}
              value={values.lastName || ''}
              error={(errors.lastName && true) || false}
              autoComplete="off"
            />
            {errors.lastName && <Typography variant="subtitle2">{errors.lastName}</Typography>}
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="_EMAIL"
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
              label="_PASS"
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
              name="confirmPassword"
              label="_CONFIRM"
              type="password"
              id="confirmPassword"
              onChange={evt => handleChange(evt)}
              value={values.confirmPassword || ''}
              error={(errors.confirmPassword && true) || false}
              autoComplete="off"
            />
            {errors.confirmPassword && <Typography variant="subtitle2">{errors.confirmPassword}</Typography>}
          </Grid>
          <Grid item xs={12}>
            <CheckboxWithLink
              required
              id="terms"
              checkboxText={STRINGS.REGISTER_READ_ACC}
              checkboxLink={STRINGS.REGISTER_ACC_TERMS}
              // TODO: Make this dynamic somehow
              checkboxHref="/terms/ro"
              error={errors.terms || false}
              value={values.terms || false}
              handleLinkClick={evt => handleLinkClick(evt, 'terms')}
              handleChange={value => handleChange(value, 'terms')}
            />
            <CheckboxWithLink
              required
              id="privacy"
              checkboxText={STRINGS.REGISTER_READ_ACC}
              checkboxLink={STRINGS.REGISTER_ACC_PRIVACY}
              // TODO: Make this dynamic somehow
              checkboxHref="/privacy/ro"
              error={errors.privacy || false}
              value={values.privacy || false}
              handleLinkClick={evt => handleLinkClick(evt, 'privacy')}
              handleChange={value => handleChange(value, 'privacy')}
            />
            <DialogHeight
              id={`dialog${whichModal}`}
              open={openModal}
              handleClose={evt => handleClose(evt)}
              title={whichModal === 'terms' ? '_TERMS' : '_PRIVACY'}
              buttonText={STRINGS.AGREE}
            >
              {whichModal === 'terms' ? <Terms /> : <Privacy />}
            </DialogHeight>
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

const EmailSent = ({ message }) => {
  return (
    <Typography component="h1" align="center" variant="h5">
      {message}
    </Typography>
  );
};

const Register = () => {
  const classes = useStyles();
  const { STRINGS } = useContext(TranslationsContext).state;

  const _register = () => {
    createUser({
      variables: {
        input: (({ firstName, lastName, email, password, confirmPassword }) => ({
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
        }))(values),
      },
    });
  };
  const _validate = values => {
    let errors = {};
    if (!values.firstName) {
      errors.firstName = '_FISREQ';
    }
    if (!values.lastName) {
      errors.lastName = '_LISREQ';
    }
    if (!values.email) {
      errors.email = '_EISREQ';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = '_EIS_INVALID';
    }
    if (!values.password) {
      errors.password = '_PISREQ';
    } else if (values.password.length < 3) {
      errors.password = '_P3ORMORE';
    }
    if (values.confirmPassword !== values.password) {
      errors.confirmPassword = '_PS_DO_NOT_MATCH';
    }
    if (!values.terms) {
      errors.terms = true;
    }
    if (!values.privacy) {
      errors.privacy = true;
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
    <Container component="main" maxWidth="sm">
      <Box className={classes.paper} mb={4}>
        {formValidated ? (
          <EmailSent message={STRINGS.REGISTER_EMAIL_SUCC} />
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
      </Box>
    </Container>
  );
};

export default withApollo(Register);
