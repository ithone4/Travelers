import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './InfoPage.css';


function InfoPage() {
  const [answer, setAnswer] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState();
  const [policyID, setPolicyID] = useState();
  const user = useSelector(store => store.user);
  //const policy = useSelect(store=>store.policy); <-----NEED TO ADD THIS
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_BUILDER', payload: user.id}); //dispatch call for policy builder move in future to where it makes sense
    //(1) setCurrentQuestion(); <--For "REAL" component, we should set the policy here when the page renders
  }, []);

  const onSubmit = () => {
    //dummy data for now
    dispatch({
      type: 'SAVE_TO_BUILDER',
      payload: {
        id: policyID,   //<-------POLICY ID should be retrieved from the store (see above)
        userID: user.id,
        answers: [{
          question: currentQuestion,
          answer: answer
        }]
      }
    })
  }

  const handleAnswerChange = (event) => {
    setAnswer(parseInt(event.target.value));
    setCurrentQuestion(event.target.name); //<---Temporarily setting the question for testing purposes. Should be done in useEffect().
  }
  const handlePolicyIDChange = (event) => {
    setPolicyID(event.target.value);
  }

  return (
    <div>
      {/* <div className="container">
        <p>Info Page</p>
      </div> */}
      <div className="question">
        <input type="text" name="policy_id" placeholder='Enter policy #'
          onChange={(event) => handlePolicyIDChange(event)}>
        </input>
        <h3>Reason for travel policy document</h3>
        <div>
          <input type="radio"
            id="answer_1"
            name="question_1"
            value="1"
            onChange={handleAnswerChange}
          />
          <label for="answer_1">Placeholder 1</label>
        </div>
        <div>
          <input type="radio"
            id="answer_1"
            name="question_1"
            value="2"
            onChange={handleAnswerChange} />
          <label for="answer_1">Placeholder 2</label>
        </div>
        <div>
          <input type="radio"
            id="answer_1"
            name="question_1"
            value="3"
            onChange={handleAnswerChange} />
          <label for="answer_1">Placeholder 3</label>
        </div>
        <div>
          <input type="radio"
            id="answer_1"
            name="question_1"
            value="4"
            onChange={handleAnswerChange} />
          <label for="answer_1">Placeholder 4</label>
        </div>
        <div>
          <input type="radio"
            id="answer_1"
            name="question_1"
            value="5"
            onChange={handleAnswerChange} />
          <label for="answer_1">Placeholder 5</label>
        </div>
        <button onClick={onSubmit}>Save</button>
      </div>
    </div>
  );
}

export default InfoPage;
