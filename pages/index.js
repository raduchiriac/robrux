import React, { useContext, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Link from '~/lib/hocs/withLink';
import AccountMenu from '~/components/Header/AccountMenu';
import CategoriesTwoRows from '~/components/Categories/CategoriesTwoRows';
import { TranslationsContext } from '~/lib/contexts/TranslationsContext';

import CITIES from '~/lib/constants/CITIES';

const useStyles = makeStyles(theme => ({
  root: { position: 'relative', height: '100vh', minHeight: '100%', justifyContent: 'center' },
  indexPageContent: {
    background: 'rgba(255, 255, 255, 0.19)',
    textAlign: 'center',
    width: ' 100%',
    position: 'relative',
    padding: theme.spacing(4),
    margin: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    maxWidth: theme.breakpoints.values.md,
    [theme.breakpoints.down('xs')]: {
      background: 'transparent',
      margin: 0,
    },
  },
  indexPageBackgroundImage: {
    backgroundSize: 'cover',
    backgroundImage: 'url("/backgrounds/index_page.jpeg")',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'absolute',
    zIndex: -1,
    filter: 'brightness(0.66)',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
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
  indexPageSearchButton: {
    marginLeft: `${theme.spacing(1) / 2}px`,
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
    position: 'absolute',
    width: 160,
    height: 160,
    left: '50%',
    top: 0,
    background: 'white',
    transform: 'translateX(-50%) translateY(-90%)',
    borderRadius: '50%',
    padding: theme.spacing(2),
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
  buttonAway: {
    color: 'white',
    textDecoration: 'underline',
  },
}));

const Index = () => {
  const classes = useStyles();
  let [stringToBeSearched, setStringToBeSearched] = useState('');
  const { STRINGS } = useContext(TranslationsContext).state;
  let [citiesDropDownValue, setCititesDropDownValue] = useState('bruxelles');

  return (
    <Grid container className={classes.root} alignItems="center">
      <Box className={classes.indexPageBackgroundImage}></Box>
      <AccountMenu className={classes.accountMenu} />
      <Box className={classes.indexPageContent}>
        <Box className={classes.indexPageLogo}>
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
            <Button className={classes.indexPageSearchButton} color="primary" type="submit">
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
        <CategoriesTwoRows categories={STRINGS.SERVICE_NEW_CATEGORIES} />
        <Box>
          <Link className={classes.buttonAway} href="/browse">
            {STRINGS.INDEX_BROWSE_FREE}
          </Link>
        </Box>
      </Box>
    </Grid>
  );
};

export default Index;
