import React, { useContext, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import Link from '~/lib/hocs/withLink';

import CITIES from '~/lib/constants/CITIES';

import './IndexPageContainer.scss';
import { LanguagesContext } from '~/lib/contexts/LanguagesContext';

const useStyles = makeStyles(theme => ({
  indexPageContent: {
    padding: theme.spacing(4),
    margin: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    maxWidth: theme.breakpoints.values.md,
    [theme.breakpoints.down('xs')]: {
      background: 'transparent',
      margin: 0,
    },
  },
  indexPageForm: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      flexWrap: 'wrap',
    },
  },
  indexPageFormSearch: {
    padding: 10,
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  indexPageFormField: {
    flex: 1,
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(1),
    },
  },
  indexPageDivider: {
    height: 28,
    margin: 4,
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  indexPageFormControl: {
    margin: theme.spacing(1),
    minWidth: 150,
    [theme.breakpoints.down('xs')]: {
      minWidth: 'auto',
      flexBasis: '100%',
    },
  },
}));

const IndexPageContainer = props => {
  const classes = useStyles();
  let [stringToBeSearched, setStringToBeSearched] = useState('');
  const { STRINGS } = useContext(LanguagesContext).state;
  let [citiesDropDownValue, setCititesDropDownValue] = useState('bruxelles');

  return (
    <Grid container className="index-page__container" alignItems="center">
      <Snackbar
        variant="success"
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        TransitionComponent={props => <Slide {...props} direction="left" />}
        autoHideDuration={3000}
        open={!!props.login.length}
        onClose={() => ({})}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{STRINGS.INDEX_SNACK_WELCOME}</span>}
      />
      <Box style={{ backgroundImage: "url('/index_page.jpeg')" }} className="index-page__image"></Box>
      <Box className={clsx(classes.indexPageContent, 'index-page__content')}>
        <Box className="index-page__logo">
          <img src="/robrux.png" />
        </Box>
        <Paper component="form" action="/browse" className={classes.indexPageForm}>
          <IconButton type="submit" className={classes.indexPageFormSearch} aria-label="search">
            <SearchIcon />
          </IconButton>
          <InputBase
            className={classes.indexPageFormField}
            placeholder={STRINGS.LOOKING_FOR}
            name="search"
            onChange={evt => setStringToBeSearched(evt.target.value)}
            inputProps={{ 'aria-label': STRINGS.SEARCH_SIMPLE }}
          />
          <Fade in={!!stringToBeSearched.length}>
            <Button color="primary" type="submit">
              {STRINGS.SEARCH_SIMPLE}
            </Button>
          </Fade>
          <Divider className={classes.indexPageDivider} orientation="vertical" />
          <FormControl className={classes.indexPageFormControl}>
            <NativeSelect
              value={citiesDropDownValue}
              onChange={evt => {
                setCititesDropDownValue(evt.currentTarget.value);
              }}
              name="location"
              disableUnderline={true}
              className={classes.inputPageSelectEmpty}
              inputProps={{ 'aria-label': 'location' }}
            >
              {Object.keys(CITIES)
                .sort()
                .map((city, idx) => (
                  <option key={idx} value={city}>
                    {CITIES[city].name}
                  </option>
                ))}
            </NativeSelect>
          </FormControl>
        </Paper>
        <Box mt={2} mb={0}>
          <Typography>
            <Link naked={true} href="/browse" style={{ color: 'white' }}>
              {STRINGS.INDEX_BROWSE_FREE}
            </Link>
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
};

export default IndexPageContainer;
