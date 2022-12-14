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
import RegistrationTravelers from '../../images/RegistrationTravelers.png'; 
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import './RegisterForm.css';

//coment


const theme = createTheme({

  palette: {
    primary: {
      main: '#E31B23', //FerskTech dark blue
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
      label: '1',
    },
    {
      value: 2,
      label: '2',
    },
    {
      value: 3,
      label: '3',
    },
    {
      value: 4,
      label: '4',
    },
    {
      value: 5,
      label: '5',
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
        
        role_id: 1, // integer for admin page
        last_question: 1, // integer of last saved question probably won't exist on register page



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
      <img alt="logo" className="fersk-tech-registration" src={RegistrationTravelers}/>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
     
      <div>
         <ThemeProvider theme={theme}>
           <Box textAlign="center">
         <FormControl sx={{ m: 1, minWidth: 240 }}>
        <TextField sx={{input:{color: '#000000'}}}
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
        <FormControl sx={{ m: 1, minWidth: 240 }}>
        <TextField sx={{input:{color: '#000000'}}}
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
        <FormControl sx={{ m: 1, minWidth: 240 }}>
        <TextField sx={{input:{color: '#000000'}}}
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
        <FormControl sx={{ m: 1, minWidth: 240 }}>
        <TextField sx={{input:{color: '#000000'}}}
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
        <FormControl sx={{ m: 1, minWidth: 240 }}>
        <TextField sx={{input:{color: '#000000'}}}
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
        <FormControl sx={{ m: 1, minWidth: 240 }}>
        <TextField sx={{input:{color: '#000000'}}}
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
          <FormControl sx={{ m: 1, minWidth: 240 }}>
        <TextField sx={{input:{color: '#000000'}}}
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
      <FormControl variant="standard" color="primary" sx={{ m: 1, minWidth: 240}}>
        <InputLabel className="indUst" id="industry-dropdown">Line of Business/Role *</InputLabel>
        <Select
          labelId="industry-label-id"
          id="industry-id"
          value={industry}
          onChange={dropChange}
          label="industry"
          required
        >
          <MenuItem className="menuItem" value="Bond and Specialty Insurance">Bond and Specialty Insurance - Employee</MenuItem>
          <MenuItem className="menuItem" value="Bond and Specialty Insurance">Bond and Specialty Insurance - Manager</MenuItem>

          <MenuItem className="menuItem" value="Business Insurance">Business Insurance - Employee</MenuItem>
          <MenuItem className="menuItem" value="Business Insurance">Business Insurance - Manager</MenuItem>

          <MenuItem className="menuItem" value="Claim">Claim - Employee</MenuItem>
          <MenuItem className="menuItem" value="Claim">Claim - Manager</MenuItem>

          <MenuItem className="menuItem" value="Corporate Technology">Corporate Technology - Employee</MenuItem>
          <MenuItem className="menuItem" value="Corporate Technology">Corporate Technology - Manager</MenuItem>

          <MenuItem className="menuItem" value="Digital Enablement">Digital Enablement - Employee</MenuItem>
          <MenuItem className="menuItem" value="Digital Enablement">Digital Enablement - Manager</MenuItem>

          <MenuItem className="menuItem" value="Infrastructure and Cloud Services">Infrastructure and Cloud Services - Employee</MenuItem>
          <MenuItem className="menuItem" value="Infrastructure and Cloud Services">Infrastructure and Cloud Services - Manager</MenuItem>

          <MenuItem className="menuItem" value="Personal Insurance">Personal Insurance - Employee</MenuItem>
          <MenuItem className="menuItem" value="Personal Insurance">Personal Insurance - Manager</MenuItem>

          {/* <MenuItem className="menuItem" value="Finance, Credit and Insurance">Finance, Credit and Insurance</MenuItem> */}
          {/* <MenuItem className="menuItem" value="Government">Government</MenuItem>
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
          <MenuItem className="menuItem" value="Travel">Travel</MenuItem> */}
        </Select>
      </FormControl>
      </Box>
      </ThemeProvider>
      </div>
      <br></br>
      <div>
      <ThemeProvider theme={theme}>
      <Box textAlign="center">
      <FormControl variant="standard" color="primary" sx={{ m: 1, minWidth: 240 }}>
        <InputLabel id="travel-spend-dropdown">Est. Length of Employment *</InputLabel>
        <Select 
          labelId="travel-spend-label-id"
          id="travel-spend-id"
          value={travel_spend}
          onChange={handleChange}
          label="travel_spend"
        >
          <MenuItem className="menuItem" value="Less than 1 year">Less than 1 year</MenuItem>
          <MenuItem className="menuItem" value="1 - 2 years">1 - 2 years</MenuItem>
          <MenuItem className="menuItem" value="2 - 5 years">2 - 5 years</MenuItem>
          <MenuItem className="menuItem" value="5 - 10 years">5 - 10 years</MenuItem>
          <MenuItem className="menuItem" value="10 - 20 years">10 - 20 years</MenuItem>
          <MenuItem className="menuItem" value="More than 20 years">More than 20 years</MenuItem>
        </Select>
      </FormControl>
      </Box>
      </ThemeProvider>
    </div>
    <div>
    <br></br>
    </div>
    {/* <div>
    <ThemeProvider theme={theme}>
      <Box textAlign="center">
      <FormControl variant="standard" color="primary" sx={{ m: 0, minWidth: 240 }}>
      <InputLabel sx={{input:{color: '#E31B23'}}}>Company Culture Slider</InputLabel>
      </FormControl>
      </Box>
      </ThemeProvider>
      </div> */}
      <br></br>
      <br></br>
   <div>
    <ThemeProvider theme={theme}>
    <Box textAlign="center" sx={{ width: 340 }}>
      <Tooltip 
      TransitionComponent={Fade} 
      TransitionProps={{timeout: 600 }} 
      title="On the slider please choose an option which reflects how satified you are with your managers performance. 1 being extremely unsatisfied and 5 being extremely satisfied." 
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
