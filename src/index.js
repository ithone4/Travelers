import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import store from './redux/store';
import App from './components/App/App';

const theme = createTheme({

  palette: {
    primary: {
      main: '#001A67', //FerskTech dark blue
    },
    secondary: {
      main: '#1096D3', //FerskTech light blue
    },
    error: {
      main: '#55CA8D', //FerskTech green
    },
    warning: {
      main: '#F37E20', //FerskTech orange
    },
    // success: {
    //   main: '#FFFFFF', // white
    // },
  },

  typography: {
    fontFamily: 'Nunito Sans',
    fontWeightLight: 200,
    fontWeightRegular: 300,
    fontWeightRegular: 400,
    fontWeightBold: 600,
    subtitle1: {
      fontSize: 12,
    },
    body1: {
      fontWeight: 500,
    },
  },
});

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('react-root'),
);
