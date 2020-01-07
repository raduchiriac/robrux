import React from 'react';
import { storiesOf } from '@storybook/react';
import SmallGig from '~/components/Gig/SmallGig';
import { TranslationsContextProvider } from '~/lib/contexts/TranslationsContext';

const TranslationDecorator = storyFn => <TranslationsContextProvider>{storyFn()}</TranslationsContextProvider>;

storiesOf('Small Gig', module)
  .addDecorator(TranslationDecorator)
  .add('Skeleton', () => <SmallGig loading="true" />)
  .add('With some data', () => (
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
        title: "Abba in '74",
        _providerAvatar: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/ABBA_-_TopPop_1974_5.png',
      }}
    />
  ));
