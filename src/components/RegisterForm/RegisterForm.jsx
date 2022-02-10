import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';

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

  


  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

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
        // travel_spend: null,
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
      alert("HQ location is resuired.");
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
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
  
      <div>
        <label htmlFor="username">
          Email:
          <input
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="first_name">
          First Name:
          <input
            type="text"
            name="first_name"
            value={first_name}
            required
            onChange={(event) => setFirstName(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="last_name">
          Last Name:
          <input
            type="text"
            name="last_name"
            value={last_name}
            required
            onChange={(event) => setLastName(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="company_name">
          Company:
          <input
            type="text"
            name="company_name"
            value={company_name}
            required
            onChange={(event) => setCompanyName(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="phone_number">
          Telephone:
          <input
            type="text"
            name="phone_number"
            value={phone_number}
            required
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="location">
          HQ Location:
          <input
            type="text"
            name="location"
            value={location}
            required
            onChange={(event) => setLocation(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="industry">
          Industry:
          <input
            type="text"
            name="industry"
            value={industry}
            required
            onChange={(event) => setIndustry(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="travel_spend">
          Est. Annual Travel Spend:
          <input
            type="text"
            name="travel_spend"
            value={travel_spend}
            required
            onChange={(event) => setTravelSpend(event.target.value)}
          />
        </label>
      </div>
      <br />
      <div>
      <Button className="btn-primary registerButton" variant="contained" onClick={validateUser}>
          Register
        </Button>
      </div>
    </form>
  );
}

export default RegisterForm;
