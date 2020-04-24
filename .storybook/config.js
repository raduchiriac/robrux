import { configure, addDecorator } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import StylesDecorator from './StylesDecorator';
import '~/pages/_app.css';

addDecorator(StylesDecorator);
addDecorator(withA11y);

const req = require.context('~/components/_stories', true, /\.stories\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
