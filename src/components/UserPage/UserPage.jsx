import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import Utility from '../../utility';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { array } from 'prop-types';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const companyPolicy = useSelector(store => store.policyBuilderReducer.policyBuilderReducer);
  const companyCulture = useSelector(store => store.policyBuilderReducer.companyCultureReducer);
  const answersFromTempStore = useSelector(store => store.policyBuilderReducer.tempPolicyReducer);
  const questionReducer = useSelector((store) => store.questionReducer);
  const groupReducer = useSelector((store) => store.groupReducer);
  const dispatch = useDispatch();
  const history = useHistory();

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
    history.push(`/question/${user.id}`)
  }


  //setting the document data for generator
  //this utilizes these items from the store: groupReducer, policyBuilderReducer.policyBuilderReducer, questionReducer
  //then stores it in the documentReducer
  //change policy_text_ to answer_ if you want to generate answer text for testing.
  const setDocument = ()=>{ 
    let array = [];
    groupReducer.forEach(el => {array.push({
          group_id: el.id,
          header: el.group_name,
          Paragraphs: []
        })});

    for (let i = 0; i < questionReducer.length; i++) {
      if (companyPolicy[0][`question_${i+1}`] != null && companyPolicy[0][`question_${i+1}`] != 6){ 
        array[questionReducer[i].group_id - 1].Paragraphs.push(questionReducer[i][`policy_text_${companyPolicy[0][`question_${i+1}`]}`]);
      }//end if
    } // end for
  //filters out unused sections
   let newArray = array.filter((el)=>{
     if (el.Paragraphs.length > 0){return true}
     else{return false }
   })
  dispatch({type: "SET_DOCUMENT", payload: newArray})
  return newArray;
  } //end set document data



  return (
    <div className="container">
      <h1>Hello World!!!</h1>
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      {/* Testing save from outside Builder component */}
      <p>
        <button onClick={startBuilder}>Start Builder</button>
      </p>
      <p>
        <button onClick={save}>Save and Return to Menu</button>
      </p>
      <p>
        <button onClick={()=>{setDocument(); history.push("/docgen");}}>document data</button>
      </p>
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
