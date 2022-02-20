import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import './AboutPage.css'
import { Divider } from '@mui/material';

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
    <div>
      <h1 className='h1'>Help Guide</h1>
      <div className='card-body'>     
      <Card className='card1'>
        <h3 className='card-text'>Important Terminology</h3>
        <p className='card-text'><b>OBT:</b>  Online Booking Tool (a tool which consolidates)</p>
        <Divider variant="inset" component="li" />
        <p className='card-text'><b>OTA: </b> Online Travel Agency (a company/service such as Expedia, booking.com, Skyscanner, Google Flights)</p>
        </Card>
        </div>
        <div className='card-body'>
        <Card className='card2'>
        <h3 className='card-text'>FAQ</h3>
        <h3 className='card-text'>What other services does FerskTech offer?</h3>
        <p className='card-text'>FerskTech offers state-of-the-art travel technology for corporate travel programs. This includes all elements of category management, from strategy, RFP, auditing, and ongoing optimization</p>
        <Divider variant="inset" component="li" />
        <h3 className='card-text'>Does FerskTech offer further support for policy building?</h3>
        <p className='card-text'>Yes! We would love to speak to you more. Please contact Vicki (vbschuur@fersktech.com) for more details.</p>
      </Card>
      </div>
    </div>
  );
}

export default AboutPage;
