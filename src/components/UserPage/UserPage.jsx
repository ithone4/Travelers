import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import Utility from '../../utility';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './UserPage.css';
import Button from '@mui/material/Button';
import Box from '@mui/material/Card';
import { shadows } from '@mui/system';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const companyPolicy = useSelector(store => store.policyBuilderReducer.policyBuilderReducer);
  const companyCulture = useSelector(store => store.policyBuilderReducer.companyCultureReducer);
  const answersFromTempStore = useSelector(store => store.policyBuilderReducer.tempPolicyReducer);
  const questionReducer = useSelector((store) => store.questionReducer);
  const groupReducer = useSelector((store) => store.groupReducer);
  const saveButton = useSelector(store => store.showSaveReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: 'SET_SAVE',
              payload: saveToggle
                });
}, []);

const helpGuide = () => {
  history.push(`/about`)
}


const [saveToggle, setSaveButton] = useState(false);

  useEffect(() => {
    dispatch({ type: 'FETCH_BUILDER', payload: user.id });
    dispatch({ type: 'FETCH_COMPANY_CULTURE', payload: user.id });
  }, [])

  const save = () => {
    console.log(`in save and answersFromTempStore are:`, answersFromTempStore);
    let policyArray = Utility.formatPolicyAnswersForDatabase(answersFromTempStore);
    console.log(`in save of UserPage and policyArray is:`, policyArray);
    if (policyArray.answers.length != 0) {
      try {
        dispatch({ type: 'SAVE_BUILDER_TO_DB', payload: policyArray });
      } catch (error) {
        console.log(`error saving policy answers to database`);
      }
    }
  }
  const startBuilder = () => {

    console.log(`in startBuilder!`);
    console.log(`value in companyCulture is:`, companyCulture);
    console.log(`value of companyPolicy is:`, companyPolicy)
    history.push(`/question/${user.last_question}`)
  }


  //setting the document data for generator
  //this utilizes these items from the store: groupReducer, policyBuilderReducer.policyBuilderReducer, questionReducer
  //then stores it in the documentReducer
  //change policy_text_ to answer_ if you want to generate answer text for testing.
  const setDocument = () => {
    const regex = /<xxx>/i;
    let array = [];
    groupReducer.forEach(el => {
      array.push({
        group_id: el.id,
        header: el.group_name,
        Paragraphs: []
      })
    });

    for (let i = 0; i < questionReducer.length; i++) {
      if (companyPolicy[0][`question_${i + 1}`] != null && !(companyPolicy[0][`question_${i + 1}`] > 6)) {
        array[questionReducer[i].group_id - 1].Paragraphs.push(questionReducer[i][`answer_${companyPolicy[0][`question_${i + 1}`]}`].replace(regex, user.company_name));
      }//end if
    } // end for
    //filters out unused sections
    let newArray = array.filter((el) => {
      if (el.Paragraphs.length > 0) { return true }
      else { return false }
    })
    dispatch({ type: "SET_DOCUMENT", payload: newArray })
    return newArray;
  } //end set document data

  //dispatch({type: 'UPDATE_LAST_QUESTION', payload: {last_question: 20, id: user.id}})

  return (
    <div className='body' >
      <Box  className='card1' sx={{ boxShadow: 10 }}> 
      <div className='header'>
      <h1 >Welcome to FerskTech's Policy Builder, {user.company_name}!</h1>
      </div>
      <h2 className='body'>How would you like to use the Policy Builder today?</h2>
      <p></p>
      <p className='body'>
      <Button className='button' onClick={()=>{history.push(`/question/1`);}}>New Policy</Button>
      </p>
      <p className='body'>
        <Button className='button2'onClick={startBuilder}>Resume Policy</Button>
      </p>
      <p className='body'>
        <Button className='button' onClick={() => { setDocument(); history.push("/docgen"); }}>Generate Policy</Button>
      </p>
      <p className='body'>
        <Button className='button2' onClick={helpGuide}>Help Guide</Button>
      </p>
      </Box>
      
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
