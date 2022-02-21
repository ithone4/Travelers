import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import './AboutPage.css'
import { Divider, Box } from '@mui/material';
import { shadows } from '@mui/system';

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
        <Box  className='card1' sx={{boxShadow: 10 }}>
        <h1 className='card-text'>FAQ</h1>
        <Divider variant="inset" />
        <h3 className='card-text'>What is the Verbiage Scale?</h3>
        <p className='card-text'>Our scale of 5 options in our builders shows 'More Strict' examples to 'More Easy Going' versions.</p>
        <Divider variant="inset" />
        <h3 className='card-text'>Can I change the verbiage?</h3>
        <p className='card-text'>Of course, and in fact we encourage it. We at FerskTech believe Travel Policies should reflect the corporate culture, so while we can guide you towards the right terminology we recommend you tailor it once you have downloaded the policy.</p>
        <Divider variant="inset" />
        <h3 className='card-text'>Do I need to answer all of the questions?</h3>
        <p className='card-text'>No. You can skip, questions you do not feel are relevant to your company, or do not wish to complete.</p>
        <Divider variant="inset" />
        <h3 className='card-text'>Can I save and come back?</h3>
        <p className='card-text'>Yes. The Policy Builder is continually saving in the background. By logging back in you will have the ability to continue from where you left off. </p>
        <Divider variant="inset" />
        <h3 className='card-text'>Is there the same answer for questios?</h3>
        <p className='card-text'>	For some points, we consider the definition of best in class being quite narrow, and therefore have provided less options.</p>
        <Divider variant="inset" />
        <h3 className='card-text'>Do you have an acronym and definitions list?</h3>
        <p className='card-text'>Yes. Like many industries, the travel industry has many acronymns and terms to learn. Scroll down to see a list which are beneficial for both building a travel policy, plus learning more about the wider industry. </p>
        <Divider variant="inset" />
        <h3 className='card-text'>Which browsers does the policy builder work in?</h3>
        <p className='card-text'>The policy builer has been tested on Google Chrome, Internet Explorer, Safari, Mozilla Firefox.</p>
        <Divider variant="inset" />
        <h3 className='card-text'>How do I extract the policy once it is completed?</h3>
        <p className='card-text'>You can extract either as a Word document, PDF, or in Excel.</p>
        <Divider variant="inset" />
        <h3 className='card-text'>What other services does FerskTech offer?</h3>
        <p className='card-text'>FerskTech offers state-of-the-art travel technology for corporate travel programs. This includes all elements of category management, from strategy, RFP, auditing, and ongoing optimization</p>
        <Divider variant="inset" />
        <h3 className='card-text'>Does FerskTech offer further support for policy building?</h3>
        <p className='card-text'>Yes! We would love to speak to you more. Please contact Vicki (vbschuur@fersktech.com) for more details.</p>
      </Box>
      <br></br>
      </div>
      <div className='card-body'> 
      <Box  className='card2' sx={{ boxShadow: 10 }}> 
        <h1 className='card-text'>Important Terminology</h1>
        <Divider variant="inset" />
        <h3 className='card-text'>ABR </h3>
        <p className='card-text'>	Average Booked Rate of hotel stays (see also ADR) </p>
        <Divider variant="inset" />
        <h3 className='card-text'>ADR </h3>
        <p className='card-text'>	Average Daily Rate of hotel stays (see also ABR) </p>
        <Divider variant="inset" />
        <h3 className='card-text'>ARC </h3>
        <p className='card-text'>Airline Reporting Corporation; an airline-owned company that provides info/ transaction services for travel agents and airlines </p>
        <Divider variant="inset" />
        <h3 className='card-text'>BAR </h3>
        <p className='card-text'>	Best Available Rate at a hotel </p>
        <Divider variant="inset" />
        <h3 className='card-text'>Black Out Dates: </h3>
        <p className='card-text'>Specific dates in which fares or promotions do not apply. These typically exist around holidays or special events. </p>
        <Divider variant="inset" />
        <h3 className='card-text'>Cabin Class </h3>
        <p className='card-text'>Classes are defined as: Economy/Coach, Premium Economy, Business class and First </p>
        <Divider variant="inset" />
        <h3 className='card-text'>Corporate Travel </h3>
        <p className='card-text'>Travel done for the need of a company. </p>
        <Divider variant="inset" />
        <h3 className='card-text'>COS </h3>
        <p className='card-text'>Class of Service; a single letter designation which refers to the terms and conditions of the air ticket purchase. This is different from the cabin class, however the COS will designate which cabin the traveler will be in. </p>
        <Divider variant="inset" />
        <h3 className='card-text'>Direct Connect </h3>
        <p className='card-text'>	Allows travelers to make bookings and reservations directly from a carrier’s website/system instead of through the GDS. </p>
        <Divider variant="inset" />
        <h3 className='card-text'>FBC </h3>
        <p className='card-text'>Fare basis Code; the code that determines the price of an airline ticket. </p>
        <Divider variant="inset" />
        <h3 className='card-text'>FTP/FFP</h3>
        <p className='card-text'>Frequent Traveler Programs / Frequent Flyer Programs, loyalty programs that are offered by many airlines, hotels and car rental agencies. Also known as Reward or Mileage programs </p>
        <Divider variant="inset" />
        <h3 className='card-text'>GDS </h3>
        <p className='card-text'>Global Distribution System; A worldwide reservation network used as single access point for reserving airlines and hotels etc. </p>
        <Divider variant="inset" />
        <h3 className='card-text'>IATA </h3>
        <p className='card-text'>	International Air Transport Association </p>
        <Divider variant="inset" />
        <h3 className='card-text'>Interline Connection </h3>
        <p className='card-text'>	A trip with a connection flight from a different airline </p>
        <Divider variant="inset" />
        <h3 className='card-text'>Layover </h3>
        <p className='card-text'>The period of time spent between connecting flights </p>
        <Divider variant="inset" />
        <h3 className='card-text'>LLC </h3>
        <p className='card-text'>Low Cost Carrier (e.g. Southwest, Ryanair, AirAsia) </p>
        <Divider variant="inset" />
        <h3 className='card-text'>LDW </h3>
        <p className='card-text'>Loss damage waiver; a supplementary car rental insurance that covers theft, vandalism, and accident damage. </p>
        <Divider variant="inset" />
        <h3 className='card-text'>LLF </h3>
        <p className='card-text'>Lowest Logical Fare; the lowest fare set within a corporation’s travel policy </p>
        <Divider variant="inset" />
        <h3 className='card-text'>Minimum Connection Time </h3>
        <p className='card-text'>	The shortest time that is required in order to successfully transfer to a connecting flight. </p>
        <Divider variant="inset" />
        <h3 className='card-text'>MLOS </h3>
        <p className='card-text'>	Minmum Length Of Stay, sometimes hotels will require a MLOS to book at that property </p>
        <Divider variant="inset" />
        <h3 className='card-text'>Multi-Segment </h3>
        <p className='card-text'>A trip comprised of more than 2 destinations </p>
        <Divider variant="inset" />
        <h3 className='card-text'>Non-Refundable Ticket </h3>
        <p className='card-text'>A ticket cannot be returned in exchange for the money spent on the ticket. Instead it is refunded with a fee and credit is given to use on a future flight. </p>
        <Divider variant="inset" />
        <h3 className='card-text'>OBT </h3>
        <p className='card-text'>  Online Booking Tool; a tool which consolidates ravel options that a traveler can use to book their trip</p>
        <Divider variant="inset" />
        <h3 className='card-text'>Open Jaw </h3>
        <p className='card-text'>A round-trip ticket in which the traveler does not arrive to the same departure city and/or does not depart from the same city where they first landed. (e.g. London to New York to Boston to London). </p>
        <Divider variant="inset" />
        <h3 className='card-text'>OTA </h3>
        <p className='card-text'> Online Travel Agency; a company/service such as Expedia, booking.com, Skyscanner, Google Flights</p>
        <Divider variant="inset" />
        <h3 className='card-text'>Overbooking </h3>
        <p className='card-text'>When an airline books more reservations than available seats. </p>
        <Divider variant="inset" />
        <h3 className='card-text'>PCC </h3>
        <p className='card-text'>Pseudo City Code; a GDS term for location of reservation </p>
        <Divider variant="inset" />
        <h3 className='card-text'>PNR </h3>
        <p className='card-text'>Passenger Name Record; A GDS term for creation of a reservation within system </p>
        <Divider variant="inset" />
        <h3 className='card-text'>Preferred Supplier/Vendor</h3>
        <p className='card-text'>A mutual agreement between airlines, hotels and/or car rental agencies and a company to promote increased bookings with specific suppliers. This can lead to a higher discount and travel benefits earned by the company. </p>
        <Divider variant="inset" />
        <h3 className='card-text'>Split Ticketing </h3>
        <p className='card-text'>Where two separate tickets for a single journey, usually to obtain a lower fare. Or if a ticketing agreement does not exist between the carriers used on the trip. </p>
        <Divider variant="inset" />
        <h3 className='card-text'>TA</h3>
        <p className='card-text'>Travel Agent; someone who can assist a traveler with booking a trip, and on-trip support </p>
        <Divider variant="inset" />
        <h3 className='card-text'>TM</h3>
        <p className='card-text'>Travel Manager; the person responsible for managing travel in a corporation </p>
        <Divider variant="inset" />
        <h3 className='card-text'>TMC </h3>
        <p className='card-text'>Travel Management Company; a company that provides travel support services including agents, booking tools, and on-trip care </p>
        <Divider variant="inset" />
        <h3 className='card-text'>Unused Tickets </h3>
        <p className='card-text'>Tickets that have previously been purchased by the traveler that are available to apply to future travel reservations </p>
        <Divider variant="inset" />
        <h3 className='card-text'>Waitlist </h3>
        <p className='card-text'>If a flight is fully booked a waitlist is created for passengers who would like to be on the flight. Then if someone cancels or doesn’t show for the flight and they can take their seat. </p>
        </Box>   
        </div>
    </div>
  );
}

export default AboutPage;
