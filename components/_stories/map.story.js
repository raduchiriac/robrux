import React from 'react';
import Map from '../Map/Map';

export default { title: 'Google Maps' };

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

export const oneMarker = () => <Map gigs={gigs} />;
