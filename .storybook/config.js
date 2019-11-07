import { configure, addDecorator } from '@storybook/react';
import '../public/reset.css';
import 'leaflet/dist/leaflet.css';

const req = require.context('../components/_stories', true, /\.stories\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
