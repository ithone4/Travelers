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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FerskTechRegistration from '../../images/FerskTechRegistration.png'; 

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
    fontFamily: 'Nunito Sans',
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
  const [culture, setCulture] = useState(0);

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
      value: 0,
      label: 'Strict',
    },
    {
      value: 25,
      label: '',
    },
    {
      value: 50,
      label: 'Center',
    },
    {
      value: 75,
      label: '',
    },
    {
      value: 100,
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
        <TextField
        color="primary"
        variant="standard"
        id="outlined-name"
        label="Email"
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
        <TextField
        color="primary"
        variant="standard"
        id="outlined-name"
        label="Password"
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
        <TextField
        color="primary"
        variant="standard"
        id="outlined-name"
        label="First Name"
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
        <TextField
        color="primary"
        variant="standard"
        id="outlined-name"
        label="Last Name"
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
        <TextField
        color="primary"
        variant="standard"
        id="outlined-name"
        label="Company Name"
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
        <TextField
        color="primary"
        variant="standard"
        id="outlined-name"
        label="Phone Number"
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
        <TextField
        color="primary"
        variant="standard"
        id="outlined-name"
        label="HQ Location"
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
          <MenuItem value="Agriculture">Agriculture</MenuItem>
          <MenuItem value="Automotive">Automotive</MenuItem>
          <MenuItem value="Chemicals">Chemicals</MenuItem>
          <MenuItem value="Construction">Construction</MenuItem>
          <MenuItem value="Education">Education</MenuItem>
          <MenuItem value="Entertainment, Arts and Broadcasting">Entertainment, Arts and Broadcasting</MenuItem>
          <MenuItem value="Fast Moving Consumer Goods, Food and Beverage">Fast Moving Consumer Goods, Food and Beverage</MenuItem>
          <MenuItem value="Finance, Credit and Insurance">Finance, Credit and Insurance</MenuItem>
          <MenuItem value="Government">Government</MenuItem>
          <MenuItem value="Health Care">Health Care</MenuItem>
          <MenuItem value="Leisure and Hospitality">Leisure and Hospitality</MenuItem>
          <MenuItem value="Manufacturing">Manufacturing</MenuItem>
          <MenuItem value="Oil, Gas, Energy and Mining">Oil, Gas, Energy and Mining</MenuItem>
          <MenuItem value="Other"><em>Other</em></MenuItem>
          <MenuItem value="Pharmaceutical">Pharmaceutical</MenuItem>
          <MenuItem value="Professional and Business Services">Professional and Business Services</MenuItem>
          <MenuItem value="Publishing">Publishing</MenuItem>
          <MenuItem value="Religious and Charitable Organizations">Religious and Charitable Organizations</MenuItem>
          <MenuItem value="Retail">Retail</MenuItem>
          <MenuItem value="Technology and Computing">Technology and Computing</MenuItem>
          <MenuItem value="Telecommunications">Telecommunications</MenuItem>
          <MenuItem value="Transportation and Warehousing">Transportation and Warehousing</MenuItem>
          <MenuItem value="Travel">Travel</MenuItem>
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
          <MenuItem value="Unknown">Unknown</MenuItem>
          <MenuItem value="0 - $1M">0 - $1M</MenuItem>
          <MenuItem value="$1M - $10M">$1M - $10M</MenuItem>
          <MenuItem value="$10M - $50M">$10M - $50M</MenuItem>
          <MenuItem value="$50M - $100">$50M - $100</MenuItem>
          <MenuItem value="$100M+">$100M+</MenuItem>
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
      <InputLabel>Company Culture Slider</InputLabel>
      </FormControl>
      </Box>
      </ThemeProvider>
      </div>
      <br></br>
   <div>
    <ThemeProvider theme={theme}>
    <Box textAlign="center" sx={{ width: 340 }}>
      <Slider
        color="primary"
        aria-label="Always visible"
        defaultValue={0}
        getArialValueText={valuetext}
        step={25}
        marks={marks}
        //valueLabelDisplay="on"
        onChange={(event) => setCulture(event.target.value)}
        
      />
    </Box>
    </ThemeProvider>
    </div>
<br></br>
      <div>
      <ThemeProvider theme={theme}>
        <Box textAlign="center">
      <Button color="primary"className="btn-primary registerButton" variant="contained" onClick={validateUser}>
          Register
        </Button>
        </Box>
        </ThemeProvider>
      </div>
    </form>
  );
}



  

  
  


export default RegisterForm;
