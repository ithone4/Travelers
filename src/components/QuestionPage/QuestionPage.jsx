import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './QuestionPage.css';
import QuestionItem from './QuestionItem';
import QuestionAnswers from './QuestionAnswers';
import Footer from '../Footer/Footer';


function QuestionPage() {
  const [answer, setAnswer] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState();
  const [policyID, setPolicyID] = useState();
  const user = useSelector(store => store.user);
  const questionR = useSelector(store=>store.questionReducer);
  // const answerList= useSelector(store=>store.answerReducer);
  // const policyID= useSelector(store=>store.policyBuilderReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_BUILDER', payload: user.id}); //dispatch call for policy builder move in future to where it makes sense
    //(1) setCurrentQuestion(); <--For "REAL" component, we should set the policy here when the page renders
  }, []);

  // let thisQuestion= 0

  const add = () =>{
    let thisQuestion=0;
    thisQuestion++;
    return thisQuestion
    
  }

  const onSubmit = () => {
    //dummy data for now
    dispatch({
      type: 'SAVE_TO_BUILDER',
      payload: {
        id: policyID,   //<-------POLICY ID should be retrieved from the store (see above)
        userID: user.id,
        answers: [{
          question: thisQuestion,
          answer: answer
        }]
      }
    })

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
      </div>
      <button onClick={add}>Add</button> */}
      <div className="question">
        <input type="text" name="policy_id" placeholder='Enter policy #'
          onChange={(event) => handlePolicyIDChange(event)}>
        </input>
        <p>
          <button onClick={startPolicyBuilder}>Start Policy Builder</button>
          <p>Total Number of Questions is: {totalNumOfQuestions}</p>
          <div>{ questions.map(( question)=>( <QuestionItem question={questions[currentQuestionID]}/>) )}</div>
          <div>{ answers.map(( question)=>( <QuestionAnswers answer={answers[currentQuestionID]}/>) )}</div>
        </p>
        <button onClick={goToPreviousQuestion}>
          Back
        </button>
        <button onClick={goToNextQuestion}>
          Next
        </button>
        <p>
          <button>Submit</button>
        </p>
        <Footer />

      </div>
    </div>
  );
}

export default QuestionPage;
