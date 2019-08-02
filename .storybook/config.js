import { configure } from '@storybook/react';

function loadStories() {
  require('../client/stories/small-gig.js');
}

configure(loadStories, module);