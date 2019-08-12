import React from 'react';
import clsx from 'clsx';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';

import './ResultList.styles.scss';
import Result from './Result';

const useStyles = makeStyles(theme => ({
  'result-list__container': props => ({
    boxShadow: theme.shadows[2],
    borderRadius: `0 0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px`,
  }),
}));

export default function ResultsList(props) {
  const classes = useStyles();
  const { results } = props;
  return (
    <Grid item>
      <List dense={true} className={clsx('result-list__container', classes['result-list__container'])}>
        {results.map((result, idx) => (
          <Result key={idx} result={result} isLast={results.length === idx + 1} isClickable={!!result._id} />
        ))}
      </List>
    </Grid>
  );
}
