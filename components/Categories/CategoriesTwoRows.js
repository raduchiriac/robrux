import React, { useContext } from 'react';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { dynamicSort } from '~/lib/helpers/utils';

import CSS from './CategoriesTwoRows.module.css';

const useStyles = makeStyles(theme => ({
  categoryContainer: {
    display: 'flex',
    overflowX: 'scroll',
    height: 100,
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  category: {
    animation: 'slidee 0.3s infinite',
    animationFillMode: 'forwards',
    animationTimingFunction: 'linear',
    margin: theme.spacing(0.5),
    backgroundColor: 'white',
    boxShadow: theme.shadows[1],
    opacity: 0.76,
  },
}));

const Category = props => {
  return (
    <Chip className={props.classes} clickable component="a" href={`/browse?category=${props.id}`} label={props.title} />
  );
};

const CategoriesTwoRows = props => {
  const classes = useStyles();
  const { categories } = props;

  return (
    <Box className={classes.categoryContainer} mt={2} mb={0}>
      {(categories || [])
        .map((service, idx) => ({ title: service, id: idx }))
        .sort(dynamicSort('title'))
        .map(service => (
          <Category key={service.id} id={service.id} title={service.title} classes={classes.category} />
        ))}
    </Box>
  );
};

export default CategoriesTwoRows;
