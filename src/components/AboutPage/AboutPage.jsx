import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import './AboutPage.css'

function AboutPage() {

  const dispatch = useDispatch();

  const saveButton = useSelector(store => store.showSaveReducer);
useEffect(() => {
  dispatch({ type: 'SET_SAVE',
            payload: saveToggle
              });
}, []);

const [saveToggle, setSaveButton] = useState(false);

  return (
    <div className='body'>
      <Card className='card'>
      <div className='body-text'>
        <h1>Help Guide</h1>
        <p></p>
        <h3>Important Terminology</h3>
        <p>OBT: Online Booking Tool (a tool which consolidates)</p>
        <p>OTA: Online Travel Agency (a company/service such as Expedia, booking.com, Skyscanner, Google Flights)</p>
        <h3>Questions</h3>
        <h3>What other services does FerskTech offer?</h3>
        <p>FerskTech offers state-of-the-art travel technology for corporate travel programs. This includes all elements of category management, from strategy, RFP, auditing, and ongoing optimization</p>
        <h3>Does FerskTech offer further support for policy building?</h3>
        <p>Yes! We would love to speak to you more. Please contact Vicki (vbschuur@fersktech.com) for more details.</p>
      </div>
      </Card>
    </div>
  );
}

export default AboutPage;
