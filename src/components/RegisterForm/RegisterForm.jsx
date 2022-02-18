import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';

// import { useTheme } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {createTheme, ThemeProvider } from '@mui/material/styles';
import FerskTechRegistration from '../../images/FerskTechRegistration.png'; 
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import './RegisterForm.css';

//coment


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

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [company_name, setCompanyName] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');
  const [industry, setIndustry] = useState('');
  const [travel_spend, setTravelSpend] = useState('');
  const [culture, setCulture] = useState(3);

  const handleChange = (event) => {
    setTravelSpend(event.target.value);
  };

  const dropChange = (event) => {
    setIndustry(event.target.value);
  };
  // const cultureChange = (event) => {
  //   setCulture(event.target.value);
  // };


  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const marks = [
    {
      value: 1,
      label: 'Strict',
    },
    {
      value: 2,
      label: '',
    },
    {
      value: 3,
      label: 'Middle',
    },
    {
      value: 4,
      label: '',
    },
    {
      value: 5,
      label: 'Easy-going',
    }
  ];

  function valuetext(value) {
    return `${value}`;
  }

  

  const registerUser = (event) => {
    // event.preventDefault();

   

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
        first_name: first_name,
        last_name: last_name,
        company_name: company_name,
        phone_number: phone_number,
        location: location,
        industry: industry,
        travel_spend: travel_spend,
        culture: culture,
        
        // role_id: null, // integer for admin page
        // last_question: null, // integer of last saved question probably won't exist on register page



      },
    });
  }; // end registerUser

  const validateUser = () => {
    
    if (first_name === "") {
      alert("First name is required.");
    } else if (last_name === "") {
      alert("Last name is required.");
    } else if (!username.includes("@")||!username.includes(".")) {
      alert("Email invalid.");
    } else if (password.length < 4) {
      alert("Password must be at least 4 characters.");
    } else if (company_name === "") {
      alert("Company name is required.");
    } else if (phone_number.length < 7) {
      alert("Phone number is required.");
    } else if (location === "") {
      alert("HQ location is required.");
    } else if (industry === "") {
      alert("Industry is required.");
    } else if (travel_spend === "") {
      alert("Estimated annual travel spend is required.");
    } else {
      registerUser();
    }
  };


  return (
    <form className="formPanel" onSubmit={validateUser}>
      <img alt="logo" className="fersk-tech-registration" src={FerskTechRegistration}/>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
     
      <div>
         <ThemeProvider theme={theme}>
           <Box textAlign="center">
         <FormControl sx={{ m: 1, minWidth: 200 }}>
        <TextField sx={{input:{color: '#001A67'}}}
        focused
        color="primary"
        variant="standard"
        id="outlined-name"
        placeholder="Email"
        value={username}
        required
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
        <FormControl sx={{ m: 1, minWidth: 200 }}>
        <TextField sx={{input:{color: '#001A67'}}}
          focused
          color="primary"
          variant="standard"
          id="outlined-name"
          placeholder="Password"
          type="password"
          value={password}
          required
          onChange={(event) => setPassword(event.target.value)}
        />
        </FormControl>
        </Box>
      </ThemeProvider>
      </div>
      <br></br>
      <div>
        <ThemeProvider theme={theme}>
        <Box textAlign="center">
        <FormControl sx={{ m: 1, minWidth: 200 }}>
        <TextField sx={{input:{color: '#001A67'}}}
        focused
        color="primary"
        variant="standard"
        id="outlined-name"
        placeholder="First Name"
        value={first_name}
        required
        onChange={(event) => setFirstName(event.target.value)}
        />
        </FormControl>
        </Box>
      </ThemeProvider>
      </div>
      <br></br>
      <div>
        <ThemeProvider theme={theme}>
        <Box textAlign="center">
        <FormControl sx={{ m: 1, minWidth: 200 }}>
        <TextField sx={{input:{color: '#001A67'}}}
        focused
        color="primary"
        variant="standard"
        id="outlined-name"
        placeholder="Last Name"
        value={last_name}
        required
        onChange={(event) => setLastName(event.target.value)}
        />
        </FormControl>
        </Box>
      </ThemeProvider>
      </div>
      <br></br>
      <div>
        <ThemeProvider theme={theme}>
        <Box textAlign="center">
        <FormControl sx={{ m: 1, minWidth: 200 }}>
        <TextField sx={{input:{color: '#001A67'}}}
        focused
        color="primary"
        variant="standard"
        id="outlined-name"
        placeholder="Company Name"
        value={company_name}
        required
        onChange={(event) => setCompanyName(event.target.value)}
        />
        </FormControl>
        </Box>
      </ThemeProvider>
      </div>
      <br></br>
      <div>
        <ThemeProvider theme={theme}>
        <Box textAlign="center">
        <FormControl sx={{ m: 1, minWidth: 200 }}>
        <TextField sx={{input:{color: '#001A67'}}}
        focused
        color="primary"
        variant="standard"
        id="outlined-name"
        placeholder="Phone Number"
        value={phone_number}
        required
        onChange={(event) => setPhoneNumber(event.target.value)}
        />
        </FormControl>
        </Box>
      </ThemeProvider>
      </div>
      <br></br>
      <div>
        <ThemeProvider theme={theme}>
        <Box textAlign="center">
          <FormControl sx={{ m: 1, minWidth: 200 }}>
        <TextField sx={{input:{color: '#001A67'}}}
        focused
        color="primary"
        variant="standard"
        id="outlined-name"
        placeholder="HQ Location"
        value={location}
        required
        onChange={(event) => setLocation(event.target.value)}
        />
        </FormControl>
        </Box>
      </ThemeProvider>
      </div>
      <br></br>
      <div>

      <ThemeProvider theme={theme}>
      <Box textAlign="center">
      <FormControl variant="standard" color="primary" sx={{ m: 1, minWidth: 200}}>
        <InputLabel id="industry-dropdown">Industry *</InputLabel>
        <Select
          labelId="industry-label-id"
          id="industry-id"
          value={industry}
          onChange={dropChange}
          label="industry"
          required
        >
          <MenuItem className="menuItem" value="Agriculture">Agriculture</MenuItem>
          <MenuItem className="menuItem" value="Automotive">Automotive</MenuItem>
          <MenuItem className="menuItem" value="Chemicals">Chemicals</MenuItem>
          <MenuItem className="menuItem" value="Construction">Construction</MenuItem>
          <MenuItem className="menuItem" value="Education">Education</MenuItem>
          <MenuItem className="menuItem" value="Entertainment, Arts and Broadcasting">Entertainment, Arts and Broadcasting</MenuItem>
          <MenuItem className="menuItem" value="Fast Moving Consumer Goods, Food and Beverage">Fast Moving Consumer Goods, Food and Beverage</MenuItem>
          <MenuItem className="menuItem" value="Finance, Credit and Insurance">Finance, Credit and Insurance</MenuItem>
          <MenuItem className="menuItem" value="Government">Government</MenuItem>
          <MenuItem className="menuItem" value="Health Care">Health Care</MenuItem>
          <MenuItem className="menuItem" value="Leisure and Hospitality">Leisure and Hospitality</MenuItem>
          <MenuItem className="menuItem" value="Manufacturing">Manufacturing</MenuItem>
          <MenuItem className="menuItem" value="Oil, Gas, Energy and Mining">Oil, Gas, Energy and Mining</MenuItem>
          <MenuItem className="menuItem" value="Other"><em>Other</em></MenuItem>
          <MenuItem className="menuItem" value="Pharmaceutical">Pharmaceutical</MenuItem>
          <MenuItem className="menuItem" value="Professional and Business Services">Professional and Business Services</MenuItem>
          <MenuItem className="menuItem" value="Publishing">Publishing</MenuItem>
          <MenuItem className="menuItem" value="Religious and Charitable Organizations">Religious and Charitable Organizations</MenuItem>
          <MenuItem className="menuItem" value="Retail">Retail</MenuItem>
          <MenuItem className="menuItem" value="Technology and Computing">Technology and Computing</MenuItem>
          <MenuItem className="menuItem" value="Telecommunications">Telecommunications</MenuItem>
          <MenuItem className="menuItem" value="Transportation and Warehousing">Transportation and Warehousing</MenuItem>
          <MenuItem className="menuItem" value="Travel">Travel</MenuItem>
        </Select>
      </FormControl>
      </Box>
      </ThemeProvider>
      </div>
      <br></br>
      <div>
      <ThemeProvider theme={theme}>
      <Box textAlign="center">
      <FormControl variant="standard" color="primary" sx={{ m: 1, minWidth: 200 }}>
        <InputLabel id="travel-spend-dropdown">Est. Annual Travel Spend *</InputLabel>
        <Select 
          labelId="travel-spend-label-id"
          id="travel-spend-id"
          value={travel_spend}
          onChange={handleChange}
          label="travel_spend"
        >
          <MenuItem className="menuItem" value="Unknown">Unknown</MenuItem>
          <MenuItem className="menuItem" value="0 - $1M">0 - $1M</MenuItem>
          <MenuItem className="menuItem" value="$1M - $10M">$1M - $10M</MenuItem>
          <MenuItem className="menuItem" value="$10M - $50M">$10M - $50M</MenuItem>
          <MenuItem className="menuItem" value="$50M - $100">$50M - $100</MenuItem>
          <MenuItem className="menuItem" value="$100M+">$100M+</MenuItem>
        </Select>
      </FormControl>
      </Box>
      </ThemeProvider>
    </div>
    <div>
    <br></br>
    </div>
    <div>
    <ThemeProvider theme={theme}>
      <Box textAlign="center">
      <FormControl variant="standard" color="primary" sx={{ m: 0, minWidth: 200 }}>
      <InputLabel sx={{input:{color: '#001A67'}}}>Company Culture Slider</InputLabel>
      </FormControl>
      </Box>
      </ThemeProvider>
      </div>
      <br></br>
      <br></br>
   <div>
    <ThemeProvider theme={theme}>
    <Box textAlign="center" sx={{ width: 340 }}>
      <Tooltip 
      TransitionComponent={Fade} 
      TransitionProps={{timeout: 600 }} 
      title="Choose an option that best describes your company's culture. Does it feel strict, easy-going or somewhere in between?" 
      placement="top">
      <Slider
        color="primary"
        aria-label="Always visible"
        defaultValue={1}
        getArialValueText={valuetext}
        step={1}
        min={1}
        max={5}
        marks={marks}
        //valueLabelDisplay="on"
        onChange={(event) => setCulture(event.target.value)}
        
      />
      </Tooltip>
    </Box>
    </ThemeProvider>
    </div>
<br></br>
      <div>
      <ThemeProvider theme={theme}>
        <Box textAlign="center">
      <Button color="primary"className="btn-primary-registerButton" variant="contained" onClick={validateUser}>
          Register
        </Button>
        </Box>
        </ThemeProvider>
      </div>
    </form>
  );
}



  

  
  


export default RegisterForm;
