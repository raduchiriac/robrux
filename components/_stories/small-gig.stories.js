import React from 'react';
import { storiesOf } from '@storybook/react';
import SmallGig from '~/components/Gig/SmallGig';
import { TranslationsContextProvider } from '~/lib/contexts/TranslationsContext';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

const TranslationDecorator = storyFn => <TranslationsContextProvider>{storyFn()}</TranslationsContextProvider>;

storiesOf('Small Gig', module)
  .addDecorator(TranslationDecorator)
  .addDecorator(withKnobs)
  .add('Skeleton', () => <SmallGig loading={true} />)
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
        id: 123,
        title: text('Title', 'Abba'),
        _providerName: text('Provider', 'This is an image from the 70s with the group members'),
        _rating: number('Rating', 3.1111),
        price: number('Price', 540),
        priceRange: [number('Price From', 100), number('Price To', 200)],
        _providerAvatar: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/ABBA_-_TopPop_1974_5.png',
      }}
    />
  ));
