import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import EmailIcon from '@mui/icons-material/Email';
import InputAdornment from '@mui/material/InputAdornment';
import KeyIcon from '@mui/icons-material/Key';
import SignInText2 from '../../images/SignInText2.png';
import './LoginForm.css';

const theme = createTheme({

  palette: {
    primary: {
      main: '#E31B23', //Trav Black - FerskTech dark blue 001A67
    },
    secondary: {
      main: '#000000', //FerskTech light blue 1096D3
    },
    error: {
      main: '#55CA8D', //FerskTech green
    },
    warning: {
      main: '#E31B23', // Trav Red - FerskTech orange F37E20
    },
    success: {
      main: '#FFFFFF', // white
    },
  },

  typography: {
    fontFamily: 'Helvetica neue',
    fontWeightLight: 200,
    fontWeightRegular: 300,
    fontWeightRegular: 400,
    fontWeightBold: 600,

  },
});


function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      console.log(`i'm in the login!`)
      dispatch({

        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <form className="formPanel" onSubmit={login}>
      <img alt="logo" className="member-login" src={SignInText2}/>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <div>
        <ThemeProvider theme={theme}>
        <Box textAlign="center">
        <FormControl sx={{ m: 1, minWidth: 240 }}>
        <TextField sx={{input:{color: '#000000' }}}
        InputProps={{ endAdornment: (
        <InputAdornment position="start">
        <EmailIcon color="primary"> </EmailIcon>
        </InputAdornment>)}}
            focused
            placeholder="Email"
            //label="Email" 
            type="text"
            name="username"
            color="primary"
            variant="standard"
            required 
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            
        />
        </FormControl>
        </Box>
        </ThemeProvider>
      </div>
      <br></br>
      <div>
        <ThemeProvider theme={theme}>
        <Box textAlign="center">
        <FormControl sx={{ m: 1, minWidth: 240 }}>
        <TextField sx={{input:{color: '#000000' }}}
            focused
            color="primary"
            variant="standard"
            placeholder="Password"
            //label="Password"
            type="password"
            name="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            InputProps={{
            endAdornment:(
            <InputAdornment position="start">
            <KeyIcon color="primary" fontSize="medium"> </KeyIcon>
            </InputAdornment>)}}
            />
            </FormControl>
            </Box>
          </ThemeProvider>
      </div>
      <br></br>
      <div>
      <ThemeProvider theme={theme}>
        <Box textAlign="center">
      <Button color="primary" variant="contained" className="btn-primary-loginButton" type="submit" name="submit" value="Log In" >
      Continue
        </Button>
        </Box>
        </ThemeProvider>
      </div>
    </form>
  );
}

export default LoginForm;
