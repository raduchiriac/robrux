import React, { Fragment, useState, useEffect, useContext } from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import usePrevious from '~/lib/hooks/usePrevious';
import moment from 'moment';
import 'moment/locale/ro';
import Box from '@material-ui/core/Box';
import { GlobalContext } from '~/lib/contexts/GlobalContext';

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
  date,
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

  const { USER_LANG } = useContext(GlobalContext).state;
  moment.locale(USER_LANG);

  return (
    <Fragment>
      <Box component="fieldset">
        <Typography component="legend">{title}</Typography>
        {date && (
          <Typography component="span" variant="caption" display="block" gutterBottom>
            {moment(date).fromNow()}
          </Typography>
        )}
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
