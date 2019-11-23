import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
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
import Link from '~/lib/hocs/withLink';

import CITIES from '~/lib/constants/CITIES';

import './IndexPageContainer.scss';
import { LanguagesContext } from '~/lib/contexts/LanguagesContext';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function IndexPageContainer() {
  const classes = useStyles();
  const { STRINGS } = useContext(LanguagesContext).state;

  return (
    <Grid container className="index-page__container" alignItems="center">
      <Box style={{ backgroundImage: "url('/index_page.jpeg')" }} className="index-page__image"></Box>
      <Box className="index-page__content">
        <Box className="index-page__logo">
          <img src="/robrux.png" />
        </Box>
        <Paper component="form" action="/browse" className={classes.root}>
          <IconButton type="submit" className={classes.iconButton} aria-label="search">
            <SearchIcon />
          </IconButton>
          <InputBase
            className={classes.input}
            placeholder={STRINGS.SEARCH}
            name="search"
            inputProps={{ 'aria-label': STRINGS.SEARCH }}
          />
          <Divider className={classes.divider} orientation="vertical" />
          <FormControl className={classes.formControl}>
            <NativeSelect
              value="bruxelles"
              onChange={() => {}}
              name="location"
              disableUnderline={true}
              className={classes.selectEmpty}
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
            <Link naked={true} href="/" style={{ color: 'white' }}>
              {STRINGS.INDEX_BROWSE_FREE}
            </Link>
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
}
