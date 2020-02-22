import React, { useContext } from 'react';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { dynamicSort } from '~/lib/helpers/utils';

const useStyles = makeStyles(theme => ({
  categoryContainer: {
    display: 'flex',
    overflowX: 'scroll',
    height: 100,
    flexDirection: 'column',
    flexWrap: 'wrap',
    animation: 'slide 0.2s 1.5s 2 alternate',
    animationFillMode: 'forwards',
    animationTimingFunction: 'ease-out',
  },
  category: {
    margin: theme.spacing(0.5),
    backgroundColor: 'white',
    boxShadow: theme.shadows[1],
    opacity: 0.76,
  },
}));

const Category = ({ classes, id, title, location }) => {
  return (
    <Chip
      className={classes}
      clickable
      component="a"
      href={`/browse?category=${id}${location ? `&location=${location}` : ''}`}
      label={title}
    />
  );
};

const CategoriesTwoRows = ({ categories, location }) => {
  const classes = useStyles();

  return (
    <Box className={classes.categoryContainer} mt={2} mb={0}>
      {(categories || [])
        .map((service, idx) => ({ title: service, id: idx }))
        .sort(dynamicSort('title'))
        .map(service => (
          <Category
            location={location}
            key={service.id}
            id={service.id}
            title={service.title}
            classes={classes.category}
          />
        ))}
    </Box>
  );
};

export default CategoriesTwoRows;
