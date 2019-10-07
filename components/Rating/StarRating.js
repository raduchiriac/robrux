import React, { Fragment } from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

// https://material-ui.com/components/rating/#rating

const StarRating = props => {
  const { title, stars, total, size, disabled, readOnly, precision } = props;
  const [value, setValue] = React.useState(stars);

  return (
    <Fragment>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">{title}</Typography>
        <Rating
          name="simple-controlled"
          value={value}
          size={size}
          disabled={disabled == 'true'}
          readOnly={readOnly == 'true'}
          precision={precision}
          max={total}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      </Box>
    </Fragment>
  );
};

export default StarRating;
