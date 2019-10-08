import { configure } from '@storybook/react';
import '../public/reset.css';

configure(require.context('../components/_stories', true, /\.story\.js$/), module);
