import React from 'react';
import { storiesOf } from '@storybook/react';
import { SmallGig } from '../components/Map/SmallGig';

storiesOf('Small Gig', module)
  .add('while loading', () => <SmallGig loading={true}></SmallGig>)
  .add('normal', () => <SmallGig gig={{ _id: 1 }}></SmallGig>);
