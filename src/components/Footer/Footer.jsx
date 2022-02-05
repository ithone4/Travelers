import React from 'react';
import './Footer.css';
import LocalHospitalRoundedIcon from '@mui/icons-material/LocalHospitalRounded';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SailingIcon from '@mui/icons-material/Sailing';
import BusinessIcon from '@mui/icons-material/Business';
import ParkIcon from '@mui/icons-material/Park';
import Tooltip from '@mui/material/Tooltip';


const healthPop = (event) =>{
 console.log("healthPop")
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


function Footer() {
 return <footer className="footerRow">
 <Tooltip title="Select this if you company prioritize's health on this question"><LocalHospitalRoundedIcon onClick={healthPop} className="footerIcon"/></Tooltip>
 <Tooltip title="Select this if you company prioritize's cost on this question"><AttachMoneyIcon onClick={moneyPop} className="footerIcon"/></Tooltip>
 <Tooltip title="Select this if you company prioritize's sustainability on this question"><ParkIcon onClick={sustainPop} className="footerIcon"/></Tooltip>
 <Tooltip title="Select this if you company prioritize's experience on this question"><SailingIcon onClick={experiencePop} className="footerIcon"/></Tooltip>
 <Tooltip title="Select this if you company prioritize's the business process on this question"><BusinessIcon onClick={businessPop} className="footerIcon"/></Tooltip>
 </footer>;
}

export default Footer;
