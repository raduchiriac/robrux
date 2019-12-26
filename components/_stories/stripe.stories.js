import React from 'react';
import { storiesOf } from '@storybook/react';
import Card from '~/components/Stripe/Card';

storiesOf('Payment', module).add('Stripe Card', () => <Card />);
