import React from 'react';
import { storiesOf } from '@storybook/react';
import Map from '~/components/Map/Map';
import StaticMap from '~/components/Map/StaticMap';

const gigs = {
  data: [
    {
      _id: '5d5d9bd9df1ff244fc754ebf',
      location: {
        type: 'Point',
        coordinates: [50.841001, 4.355055],
        address: '3475 Eichmann Avenue, Isle of Man',
      },
      title: 'Ergonomic asymmetric functionalities',
    },
  ],
  loading: false,
};

storiesOf('Google Maps', module)
  .add('With one marker', () => <Map gigs={gigs} mapServiceProvider="google" />)
  .add('Static map (with address)', () => <StaticMap gig={gigs.data[0]} size={[300, 450]} zoom={16} withAddress />)
  .add('Static map (with link)', () => (
    <StaticMap mapServiceProvider="google" gig={gigs.data[0]} size={[300, 450]} zoom={16} withLink />
  ));

storiesOf('Pigeon Maps: Free Google', module).add('With one marker', () => (
  <Map gigs={gigs} mapServiceProvider="gmaps" />
));

storiesOf('Pigeon Maps: OpenStreetMap', module)
  .add('With one marker', () => <Map gigs={gigs} mapServiceProvider="osm" />)
  .add('Static map (with address and link)', () => (
    <StaticMap mapServiceProvider="osm" size={['100%', 150]} zoom={18} gig={gigs.data[0]} withAddress withLink />
  ));

storiesOf('Pigeon Maps: Mapbox', module).add('With one marker', () => <Map gigs={gigs} mapServiceProvider="mapbox" />);
