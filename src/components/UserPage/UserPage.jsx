import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import Utility from '../../utility';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const companyPolicy = useSelector(store => store.policyBuilderReducer.policyBuilderReducer);
  const companyCulture = useSelector(store => store.policyBuilderReducer.companyCultureReducer);
  const answersFromTempStore = useSelector(store => store.policyBuilderReducer.tempPolicyReducer);
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
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
