import React from 'react';
import { storiesOf } from '@storybook/react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import StarRating from '~/components/Rating/StarRating';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

storiesOf('Rating', module)
  .addDecorator(withKnobs)
  .add('Just the defaults', () => <StarRating />)
  .add('With custom colors and Icon', () => (
    <StarRating
      title="Do you like makeup?"
      score="3.3333"
      color="red"
      hoverColor="#00FF11"
      icon={<FavoriteIcon fontSize="inherit" />}
    />
  ))
  .add('With all other props', () => (
    <StarRating
      title={text('Title', 'How much did you like this?')}
      comment={text('Comment', 'Awesome, great experience with this person')}
      score={number('Score', '4.823442')}
      size="large"
      disabled={boolean('Disabled', false)}
      readOnly={boolean('Read-only', false)}
      maxStars={10}
      onChange={value => console.log(`setting: ${value}`)}
    />
  ));
