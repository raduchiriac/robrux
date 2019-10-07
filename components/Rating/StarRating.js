import React, { Fragment } from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

// https://material-ui.com/components/rating/#rating

const StarRating = props => {
  const { title, score, maxStars, size, disabled, readOnly, precision, onChange, color, hoverColor, icon } = props;
  const [value, setValue] = React.useState(parseInt(score, 10));

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
            onChange && onChange(newValue);
          }}
        />
      </Box>
    </Fragment>
  );
};

export default StarRating;
