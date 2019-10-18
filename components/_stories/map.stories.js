import React from 'react';
import { storiesOf } from '@storybook/react';
import Map from '../Map/Map';
import StaticMap from '../Map/StaticMap';

const gigs = [
  {
    _id: '5d5d9bd9df1ff244fc754ebf',
    location: {
      type: 'Point',
      coordinates: [50.841001, 4.355055],
      address: '3475 Eichmann Avenue, Isle of Man',
    },
    title: 'Ergonomic asymmetric functionalities',
  },
];

storiesOf('Google Maps', module)
  .add('With one marker', () => <Map gigs={gigs} />)
  .add('Static map', () => <StaticMap gig={gigs[0]} size={[300, 650]} zoom={16} />);
