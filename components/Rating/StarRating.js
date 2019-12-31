import React, { Fragment, useState, useEffect } from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const StarRating = props => {
  const {
    title,
    score,
    maxStars,
    size,
    disabled,
    readOnly,
    precision,
    comment,
    color,
    hoverColor,
    icon,
    onChange = () => {},
  } = props;

  const [value, setValue] = useState(Math.round(score));

  const StyledStarRating = withStyles({
    iconFilled: {
      color,
    },
    iconHover: {
      color: hoverColor,
    },
  })(Rating);

  return (
    <Fragment>
      <Box component="fieldset">
        <Typography component="legend">{title}</Typography>
        <StyledStarRating
          name="star-rating"
          value={value}
          size={size}
          disabled={disabled == 'true'}
          readOnly={readOnly == 'true'}
          precision={precision}
          max={maxStars}
          icon={icon}
          onChange={(event, newValue) => {
            setValue(newValue);
            onChange(newValue);
          }}
        />
        <Typography variant="caption" component="p">
          {comment}
        </Typography>
      </Box>
    </Fragment>
  );
};

export default StarRating;
