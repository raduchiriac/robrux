import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import CircularProgress from '@material-ui/core/CircularProgress';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import { useLazyQuery } from '@apollo/react-hooks';
import ResultList from './ResultsList';
import useDebounce from '~/lib/hooks/useDebounce';
import { SEARCH_GIG } from '~/lib/graphql/gigs.strings';
import { TranslationsContext } from '~/lib/contexts/TranslationsContext';

export default function SearchBox() {
  // INFO: A way to pass props down to make a custom makeStyle
  const useStyles = props =>
    makeStyles(theme => ({
      searchContainer: {
        position: 'relative',
        transition: theme.transitions.create(),
        borderRadius:
          !props.searchTermLength || !resultsCanBeOpen
            ? theme.shape.borderRadius
            : `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        flexGrow: 1,
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },
      },
      searchField: {
        display: 'flex',
        alignItems: 'center',
      },
      circularProgress: {
        marginRight: theme.spacing(1),
      },
      searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
        flexGrow: 1,
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 6),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: 200,
        },
      },
      clearIcon: { color: 'white', transform: 'scale(0.5)' },
    }))(props);

  const [searchTerm, setSearchTerm] = useState('');
  const [resultsCanBeOpen, setResultsCanBeOpen] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 550);
  const [searchGigs, { data, error, loading }] = useLazyQuery(SEARCH_GIG, {
    variables: { term: debouncedSearchTerm, limit: 8 },
  });

  const handleClickAway = () => {
    setResultsCanBeOpen(false);
  };

  const handleInputClick = evt => {
    setResultsCanBeOpen(true);
  };

  const { STRINGS } = useContext(TranslationsContext).state;

  useEffect(() => {
    if (debouncedSearchTerm.length) {
      searchGigs();
    }
  }, [debouncedSearchTerm, searchGigs]);

  let results = [];
  if (data && data.search) {
    if (data.search.length) {
      results = data.search;
    } else if (debouncedSearchTerm.length && !loading) {
      results = [{ title: STRINGS.HEADER_NOTHING, description: STRINGS.HEADER_TRY_AGAIN }];
    }
  }

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const classes = useStyles({ searchTermLength: searchTerm.length });

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className={classes.searchContainer}>
        <div className={classes.searchField}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder={STRINGS.SEARCH}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            onClick={e => handleInputClick(e)}
            inputProps={{ 'aria-label': 'search' }}
          />
          {loading && <CircularProgress size={20} className={classes.circularProgress} />}
          {!!searchTerm.length && (
            <IconButton className={classes.clearIcon} aria-label="clear" onClick={handleClearSearch}>
              <ClearIcon />
            </IconButton>
          )}
        </div>
        {resultsCanBeOpen && !!searchTerm.length && <ResultList searching={searchTerm} results={results} />}
      </div>
    </ClickAwayListener>
  );
}
