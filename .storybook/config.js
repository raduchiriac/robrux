import { configure, addDecorator } from '@storybook/react';
import '../public/reset.css';

const req = require.context('../components/_stories', true, /\.stories\.js$/);

function loadStories() {
  req.keys().sort().forEach(filename => req(filename));
}

configure(loadStories, module);
