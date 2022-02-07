import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './InfoPage.css';
import InfoItem from '../InfoItem/InfoItem';
import Utility from '../../utility';


function InfoPage() {
  const [answer, setAnswer] = useState('');
  const [answersForQuestion, setAnswersForQuestion] = useState({});
  let [currentQuestionID, setCurrentQuestionID] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState();
  const [policyID, setPolicyID] = useState();
  const [totalNumOfQuestions, setTotalNumOfQuestions] = useState();
  let [showBackButton, setShowBackButton] = useState(true);
  const [lastQuestion, setLastQuestion] = useState(false);
  //const policy = useSelect(store=>store.policy); <-----NEED TO ADD THIS
  const GO_BACK = -1;
  const GO_AHEAD = 1;
  const user = useSelector(store => store.user);
  const questions = useSelector(store => store.questionReducer);
  const answersFromStore = useSelector(store => store.answerReducer);
  const dispatch = useDispatch();

  useEffect(() => {

    dispatch({ type: 'FETCH_BUILDER', payload: user.id }); //dispatch call for policy builder move in future to where it makes sense
    //(1) setCurrentQuestion(); <--For "REAL" component, we should set the policy here when the page renders
    console.log(`in useEffect!`)
    setTotalNumOfQuestions(questions.length);

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
  const handleNextBackButtons = (event, direction) => {
    setCurrentQuestionID(currentQuestionID => currentQuestionID + direction);
    setCurrentQuestion(questions[currentQuestionID + direction])
    setAnswersForQuestion(Utility.formatAnswersForInput(getAnswersForQuestion(currentQuestionID)));

    console.log(`current question id is:`, currentQuestionID);

    if (currentQuestionID >= 1) {
      console.log(`going to want to show the button `)
      setShowBackButton(false);
    } else {
      console.log(`going to want to hide the button`)
      setShowBackButton(true);
    }
  }
  const startPolicyBuilder = (event) => {
    //User wants to start the policy builder from the beginning.
    setCurrentQuestionID(1);
    setShowBackButton(true);
    setCurrentQuestion(questions[0])
    setAnswersForQuestion(Utility.formatAnswersForInput(getAnswersForQuestion(currentQuestionID)));
  }
  const getAnswersForQuestion = (questionID) => {
    for (let i = 0; i < answersFromStore.length; i++) {
      if (answersFromStore[i].question_id === questionID) {
        console.log(`match found:`, answersFromStore[i]);
        return answersFromStore[i];
      }
    }
  }

  return (
    <div>
      <div className="question">
        <input type="text" name="policy_id" placeholder='Enter policy #'
          onChange={(event) => handlePolicyIDChange(event)}>
        </input>
        <p>
          <button onClick={startPolicyBuilder}>Start Policy Builder</button>
          <p>Total Number of Questions is: {totalNumOfQuestions}</p>
        </p>
        <InfoItem question={questions[currentQuestionID - 1]}
          answers={Utility.formatAnswersForInput(getAnswersForQuestion(currentQuestionID))}
        />

        <button disabled={showBackButton}
          onClick={(event) => { handleNextBackButtons(event, GO_BACK) }}>
          Back
        </button>
        <button onClick={(event) => { handleNextBackButtons(event, GO_AHEAD) }}>
          Next
        </button>
        <p>
          <button>Submit</button>
        </p>
      </div>
    </div >
  );
}

export default InfoPage;
