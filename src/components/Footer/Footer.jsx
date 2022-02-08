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
 <Tooltip title="Select this if you company prioritize's health on this question"><LocalHospitalRoundedIcon onClick={healthPop} className="footerIcon"/></Tooltip>
 <Tooltip title="Select this if you company prioritize's cost on this question"><AttachMoneyIcon onClick={moneyPop} className="footerIcon"/></Tooltip>
 <Tooltip title="Select this if you company prioritize's sustainability on this question"><ParkIcon onClick={sustainPop} className="footerIcon"/></Tooltip>
 <Tooltip title="Select this if you company prioritize's experience on this question"><SailingIcon onClick={experiencePop} className="footerIcon"/></Tooltip>
 <Tooltip title="Select this if you company prioritize's the business process on this question"><BusinessIcon onClick={businessPop} className="footerIcon"/></Tooltip>
 </footer>;
}

export default Footer;
