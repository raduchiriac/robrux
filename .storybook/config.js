import { configure, addDecorator } from '@storybook/react';
import withThemeProvider from '../components/_stories/withThemeProvider';
import '../public/reset.css';

addDecorator(withThemeProvider);
configure(require.context('../components/_stories', true, /\.story\.js$/), module);
