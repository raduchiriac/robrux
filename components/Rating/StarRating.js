import React, { Fragment, useState, useEffect, useRef } from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import usePrevious from '~/lib/hooks/usePrevious';
import Box from '@material-ui/core/Box';

const StarRating = ({
  title,
  score,
  maxStars,
  size,
  disabled,
  readOnly,
  comment,
  color,
  hoverColor,
  icon,
  onChange = () => {},
}) => {
  const [value, setValue] = useState(Math.round(score));
  const prevValue = usePrevious(value);

  useEffect(() => {
    if (prevValue !== value) {
      setValue(value);
    } else if (value !== score) {
      setValue(score);
    }
  }, [prevValue, score, value]);

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
          disabled={disabled}
          readOnly={readOnly}
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
