import { configure } from '@storybook/react';

function loadStories() {
  require('../client/stories/demo.js');
}

configure(loadStories, module);