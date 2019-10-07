import React from 'react';
import StarRating from '../Rating/StarRating';

export default { title: 'Star Rating' };

export const simpleWithDefaults = () => <StarRating />;

export const includingAllProps = () => (
  <StarRating
    title="I am a rating component"
    stars="1.823442"
    size="large"
    disabled="false"
    readOnly="false"
    total={7}
    precision={0.5}
  />
);
