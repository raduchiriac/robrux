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
import Link from '~/lib/hocs/withLink';
import AccountMenu from '~/components/Header/AccountMenu';

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
    padding: `${theme.spacing(1) / 2}px ${theme.spacing(1)}px`,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      flexWrap: 'wrap',
    },
  },
  indexPageFormSearch: {
    fill: theme.palette.grey[700],
    margin: `0 ${theme.spacing(1)}px`,
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
  indexPageLogo: {
    boxShadow: theme.shadows[6],
  },
  indexPageFormControl: {
    margin: theme.spacing(1),
    minWidth: 150,
    [theme.breakpoints.down('xs')]: {
      minWidth: 'auto',
      flexBasis: '100%',
    },
  },
  accountMenu: {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const IndexPageContainer = props => {
  const classes = useStyles();
  let [stringToBeSearched, setStringToBeSearched] = useState('');
  const { STRINGS } = useContext(LanguagesContext).state;
  let [citiesDropDownValue, setCititesDropDownValue] = useState('bruxelles');

  return (
    <Grid container className="index-page__container" alignItems="center">
      <Box style={{ backgroundImage: "url('/backgrounds/index_page.jpeg')" }} className="index-page__image"></Box>
      <AccountMenu className={classes.accountMenu} />
      <Box className={clsx(classes.indexPageContent, 'index-page__content')}>
        <Box className={clsx(classes.indexPageLogo, 'index-page__logo')}>
          <img src="/robrux.png" />
        </Box>
        <Paper component="form" action="/browse" className={classes.indexPageForm}>
          <SearchIcon className={classes.indexPageFormSearch} aria-label="search" />
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
            <Link href="/browse" style={{ color: 'white' }}>
              {STRINGS.INDEX_BROWSE_FREE}
            </Link>
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
};

export default IndexPageContainer;
