import React from 'react';
import StarRating from '../Rating/StarRating';
import FavoriteIcon from '@material-ui/icons/Favorite';

export default { title: 'Star Rating' };

export const justTheDefaults = () => <StarRating />;

export const customColorsAndIcon = () => (
  <StarRating
    title="Do you like makeup?"
    score="4.3333"
    color="red"
    hoverColor="#00FF11"
    icon={<FavoriteIcon fontSize="inherit" />}
  />
);

export const includingAllOtherProps = () => (
  <StarRating
    title="Hi, how much do you like me?"
    score="1.823442"
    size="large"
    disabled="false"
    readOnly="false"
    maxStars={10}
    onChange={value => console.log(`setting: ${value}`)}
    precision={0.5}
  />
);
