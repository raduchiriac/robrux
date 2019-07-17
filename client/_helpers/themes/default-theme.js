import { createMuiTheme } from '@material-ui/core/styles';

export const DefaultTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    type: 'light',
    mainColor: '#DED1AD',
    alternateColor: '#546291',
    alternateColorLight: '#ADB8DE',
    secondaryColor: '#918563',
    secondaryColorLight: '#FFF7E0',
  },
});
