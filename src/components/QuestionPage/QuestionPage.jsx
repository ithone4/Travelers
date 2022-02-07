import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './QuestionPage.css';
import QuestionItem from './QuestionItem';
import QuestionAnswers from './QuestionAnswers';


function QuestionPage() {
  const [answer, setAnswer] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState();
  const [policyID, setPolicyID] = useState();
  const user = useSelector(store => store.user);
  const questions = useSelector(store => store.questionReducer);
  let [currentQuestionID, setCurrentQuestionID] = useState(0);
  const [totalNumOfQuestions, setTotalNumOfQuestions] = useState();
  const [lastQuestion, setLastQuestion] = useState(false);
  const answers = useSelector(store => store.answerReducer);
  //const policy = useSelect(store=>store.policy); <-----NEED TO ADD THIS
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
    goToNextQuestion()
  }

  const handleAnswerChange = (event) => {
    setAnswer(parseInt(event.target.value));
    setCurrentQuestion(event.target.name); //<---Temporarily setting the question for testing purposes. Should be done in useEffect().
  }
  const handlePolicyIDChange = (event) => {
    setPolicyID(event.target.value);
  }
  const goToNextQuestion = (event) => {
    setCurrentQuestionID(currentQuestionID + 1);
  }

  const goToPreviousQuestion = (event) => {
    setCurrentQuestionID(currentQuestionID - 1);
  }
  const startPolicyBuilder = (event) => {
    setCurrentQuestionID(0);
  }

  return (
    <div>
      {JSON.stringify(questions[0])}
      <div className="question">
        <input type="text" name="policy_id" placeholder='Enter policy #'
          onChange={(event) => handlePolicyIDChange(event)}>
        </input>
        <p>
          <button onClick={startPolicyBuilder}>Start Policy Builder</button>
          <p>Total Number of Questions is: {totalNumOfQuestions}</p>
        </p>
        <QuestionItem question={questions[currentQuestionID]}
        />
        <QuestionAnswers answer={answers[currentQuestionID]}
        />
        <button onClick={goToPreviousQuestion}>
          Back
        </button>
        <button onClick={goToNextQuestion}>
          Next
        </button>
        <p>
          <button>Submit</button>
        </p>
      </div>
    </div >
  );
}

export default QuestionPage;
