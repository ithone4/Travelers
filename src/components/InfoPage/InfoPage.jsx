import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './InfoPage.css';
import InfoItem from '../InfoItem/InfoItem';


function InfoPage() {
  const [answer, setAnswer] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState();
  const [policyID, setPolicyID] = useState();
  const user = useSelector(store => store.user);
  const questions = useSelector(store => store.questionReducer);
  let [currentQuestionID, setCurrentQuestionID] = useState(0);
  const [totalNumOfQuestions, setTotalNumOfQuestions] = useState();
  const [lastQuestion, setLastQuestion] = useState(false);
  //const policy = useSelect(store=>store.policy); <-----NEED TO ADD THIS
  const dispatch = useDispatch();

  //dummy data for ideations(!):
  let questionsArray = [
    {
      group: `Weather`,
      questionNumber: 1,
      question: `Do you like the cold weather?`
    },
    {
      group: `Feeling`,
      questionNumber: 2,
      question: `How are you feeling today?`
    },
    {
      group: `Food`,
      questionNumber: 3,
      question: `What would be your last meal if you died tomorrow?`
    }
  ]

  //dummy data for ideations(!):
  //id matches the column name from the answer
  //name matches the question number
  let answersArray =
    [
      { id: `answer_1`, value: 1, text: `I love the cold.` },
      { id: `answer_1`, value: 2, text: `I don't mind the cold.` },
      { id: `answer_1`, value: 3, text: `I tolerate it but look forward to the spring.` },
      { id: `answer_1`, value: 4, text: `I really despise the cold.` },
      { id: `answer_1`, value: 5, text: `I want to run away to a warm, sunny place like St. Kitts.` }
    ];


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
        {/* <InfoItem question={questions[currentQuestionID]} */}
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

export default InfoPage;
