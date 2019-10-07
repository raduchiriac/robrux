import { configure } from '@storybook/react';

configure(require.context('../components/_stories', true, /\.story\.js$/), module);
