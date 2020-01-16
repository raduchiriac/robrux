import { configure, addDecorator } from '@storybook/react';
import StylesDecorator from './StylesDecorator';
import '../public/reset.css';

addDecorator(StylesDecorator);

const req = require.context('../components/_stories', true, /\.stories\.js$/);

function loadStories() {
  req.keys().sort().forEach(filename => req(filename));
}

configure(loadStories, module);
