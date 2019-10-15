import React from 'react';
import { storiesOf } from '@storybook/react';
import StarRating from '../Rating/StarRating';
import FavoriteIcon from '@material-ui/icons/Favorite';

storiesOf('Rating', module)
  .add('Just the defaults', () => <StarRating />)
  .add('With custom colors and Icon', () => (
    <StarRating
      title="Do you like makeup?"
      score="4.3333"
      color="red"
      hoverColor="#00FF11"
      icon={<FavoriteIcon fontSize="inherit" />}
    />
  ))
  .add('With all other props', () => (
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
  ));
