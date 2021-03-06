import React from 'react';
import { storiesOf } from '@storybook/react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import StarRating from '~/components/Rating/StarRating';
import { withKnobs, text, boolean, number, color } from '@storybook/addon-knobs';

storiesOf('Rating', module)
  .addDecorator(withKnobs)
  .add('Just the defaults', () => <StarRating />)
  .add('With custom colors and Icon', () => (
    <StarRating
      title="Do you like makeup?"
      score="3.3333"
      color={color('Main color', '#ff0000')}
      hoverColor={color('Hover color', '#40fc20')}
      icon={<FavoriteIcon fontSize="inherit" />}
    />
  ))
  .add('With all other props', () => (
    <StarRating
      title={text('Title', 'How much did you like this?')}
      comment={text('Comment', 'Awesome, great experience with this person')}
      score={number('Score', '4.823442')}
      size="large"
      date={number('Date', 1564343598482)}
      disabled={boolean('Disabled', false)}
      readOnly={boolean('Read-only', false)}
      maxStars={10}
      onChange={value => console.log(`setting: ${value}`)}
    />
  ));
