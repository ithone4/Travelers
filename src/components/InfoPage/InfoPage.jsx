import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './InfoPage.css';
import Utility from '../../utility';

function InfoPage() {
  const [answer, setAnswer] = useState('');
  const [answersForQuestion, setAnswersForQuestion] = useState({});
  let [currentQuestionID, setCurrentQuestionID] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState();
  const [policyID, setPolicyID] = useState();
  const [showBackButton, setShowBackButton] = useState(true);
  const [showNextButton, setShowNextButton] = useState(false);
  const GO_BACK = -1;
  const GO_AHEAD = 1;
  const user = useSelector(store => store.user);
  const questions = useSelector(store => store.questionReducer);
  const answersFromStore = useSelector(store => store.answerReducer);
  const companyCultureStore = useSelector(store => store.policyBuilderReducer.companyCultureReducer);
  const companyPolicy = useSelector(store => store.policyBuilderReducer.policyBuilderReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(`in useEffect!`);
    dispatch({ type: 'FETCH_BUILDER', payload: user.id }); //dispatch call for policy builder move in future to where it makes sense
    dispatch({ type: 'FETCH_COMPANY_CULTURE', payload: user.id });
  }, []);

  const onSubmit = () => {
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
  const showHideButtons = (direction) => {
    //Increase/decrese the question ID depending on button clicked
    if (direction === GO_AHEAD) {
      setCurrentQuestionID(++currentQuestionID);
    } else if (direction === GO_BACK) {
      setCurrentQuestionID(--currentQuestionID);
    }
    //Show/hide next and back buttons if necessary
    if (currentQuestionID > 1) {
      setShowBackButton(false);
    } else {
      setShowBackButton(true);
    }
    if (currentQuestionID === questions.length) {
      setShowNextButton(true);
    } else {
      setShowNextButton(false);
    }
  }
  const handleNextBackButtons = (event, direction) => {
    showHideButtons(direction);
    setCurrentQuestion(questions[currentQuestionID])
    setAnswersForQuestion(Utility.formatAnswersForInput(getAnswersForQuestion(currentQuestionID)));
  }
  const startPolicyBuilder = (event) => {
    //User wants to start the policy builder from the beginning.
    setShowBackButton(true);
    setCurrentQuestionID(1);
    setAnswersForQuestion(Utility.formatAnswersForInput(getAnswersForQuestion(currentQuestionID)));
  }
  const getAnswersForQuestion = (questionID) => {
    for (let i = 0; i < answersFromStore.length; i++) {
      if (answersFromStore[i].question_id === questionID) {
        return answersFromStore[i];
      }
    }
  }

  return (
    <div>
      <p>I'm the info page!</p>
    </div >
  );
}

export default InfoPage;
