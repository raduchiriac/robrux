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

export default function ResultsList() {
  const classes = useStyles();
  return (
    <Grid item>
      <List dense={true} className={clsx('result-list__container', classes['result-list__container'])}>
        <Result key="1" />
        <Result key="2" />
        <Result key="3" />
        <Result key="4" />
        <Result key="5" />
      </List>
    </Grid>
  );
}
