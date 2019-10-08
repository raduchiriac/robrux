import React from 'react';
import SmallGig from '../Gig/SmallGig';

export default { title: 'Small Gig' };

export const skeleton = () => <SmallGig loading="true" />;
export const withData = () => (
  <SmallGig
    _onMouseEnter={() => {
      console.log('i hover over');
    }}
    _onMouseLeave={() => {
      console.log('i hover out');
    }}
    gig={{
      id: 123,
      _providerName: 'Abba',
      _rating: 3.1111,

      price: 1000,
      title: 'Abba in 74',
      images: ['https://upload.wikimedia.org/wikipedia/commons/c/cb/ABBA_-_TopPop_1974_5.png'],
    }}
  />
);
