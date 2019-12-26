import React from 'react';
import { storiesOf } from '@storybook/react';
import MaterialCarousel from '~/components/Carousel/MaterialCarousel';

const images = [
  'https://loremflickr.com/640/480?lock=1',
  'https://loremflickr.com/640/480?lock=2',
  'https://loremflickr.com/640/480?lock=3',
  'https://loremflickr.com/640/480?lock=4',
  'https://loremflickr.com/640/480?lock=5',
  'https://loremflickr.com/640/480?lock=6',
  'https://loremflickr.com/640/480?lock=7',
  'https://loremflickr.com/640/480?lock=8',
  'https://loremflickr.com/640/480?lock=9',
];

storiesOf('Carousel', module).add('Material-UI Stepper', () => (
  <MaterialCarousel width={500} height={200} images={images}></MaterialCarousel>
));
