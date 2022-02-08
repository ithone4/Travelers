import React from 'react';
import './Footer.css';
import { useState, useEffect } from 'react';
import LocalHospitalRoundedIcon from '@mui/icons-material/LocalHospitalRounded';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SailingIcon from '@mui/icons-material/Sailing';
import BusinessIcon from '@mui/icons-material/Business';
import ParkIcon from '@mui/icons-material/Park';
import Tooltip from '@mui/material/Tooltip';

function Footer(props) {

    useEffect(() => {
        // setAnswer(getAnswersForQuestion(props.answer.id));
      });
    
    //   const getAnswersForQuestion = (questionID) => {
    //     for (let i = 0; i < props.question.length; i++) {
    //       if (props.question[i].id === questionID) {
    //         return props.question[i];
    //       }
    //     }
    //   } 

    const healthPop = (event) =>{
        console.log(`questions are:`, props.question.safety)
    }
    
    
    const moneyPop = (event) =>{
     console.log("moneyPop")
    }
    
    
    const sustainPop= (event) =>{
     console.log("sustainPop")
    }
    
    
    const experiencePop= (event) =>{
     console.log("experiencePop")
    }
    
    
    const businessPop =(event)=>{
     console.log("businessPop")
    }
    

 return <footer className="footerRow">
     {JSON.stringify(props.question.id)}
     {JSON.stringify(props.question.safety)}
     <div>{props.question.safety===true?
<Tooltip title="This question is heavily related to health.">
    <LocalHospitalRoundedIcon className="footerIcon"/>
    </Tooltip>:
            <LocalHospitalRoundedIcon disabled className="footerDisabled"/>}
            </div>
            <div>{props.question.cost===true?
<Tooltip title="This question is heavily related to cost">
    <AttachMoneyIcon className="footerIcon"/>
    </Tooltip>:
            <AttachMoneyIcon disabled className="footerDisabled"/>}
            </div>
 <div>{props.question.sustainability===true?
<Tooltip title="This question is heavily related to sustainability.">
    <ParkIcon className="footerIcon"/>
    </Tooltip>:
            <ParkIcon disabled className="footerDisabled"/>}
            </div>
            <div>{props.question.experience===true?
<Tooltip title="This question is heavily related to experience.">
    <SailingIcon className="footerIcon"/>
    </Tooltip>:
            <SailingIcon disabled className="footerDisabled"/>}
            </div>
            <div>{props.question.business_processes===true?
<Tooltip title="This question is heavily related to the business process.">
    <BusinessIcon className="footerIcon"/>
    </Tooltip>:
            <BusinessIcon disabled className="footerDisabled"/>}
            </div>
 </footer>;
}

export default Footer;
