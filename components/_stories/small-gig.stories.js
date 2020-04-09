import React from 'react';
import { storiesOf } from '@storybook/react';
import SmallGig from '~/components/Gig/SmallGig';
import { GlobalContextProvider } from '~/lib/contexts/GlobalContext';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

const GlobalDecorator = storyFn => <GlobalContextProvider>{storyFn()}</GlobalContextProvider>;

storiesOf('Small Gig', module)
  .addDecorator(GlobalDecorator)
  .addDecorator(withKnobs)
  .add('Skeleton', () => <SmallGig loading />)
  .add('With some data', () => (
    <SmallGig
      _onMouseEnter={() => {
        console.log('i hover over');
      }}
      _onMouseLeave={() => {
        console.log('i hover out');
      }}
      loading={boolean('Loading', false)}
      gig={{
        _id: 123,
        title: text('Title', 'Abba'),
        _rating: number('Rating', 3.1111),
        price: number('Price', 540),
        priceRange: [
          number('Price from', 100, { range: true, max: 500, min: 0, step: 10 }),
          number('Price to', 550, { range: true, min: 510, max: 990, step: 10 }),
        ],
        slug: 'this-is-abba-slug',
        _userId: {
          _id: '443abba',
          firstName: text('First Name', 'This is a picture from the 70s'),
          lastName: text('Last Name', 'with the group members'),
          avatar: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/ABBA_-_TopPop_1974_5.png',
        },
      }}
    />
  ));
