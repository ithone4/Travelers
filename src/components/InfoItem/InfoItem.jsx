import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './InfoItem.css';


function InfoPage(props) {
  const [answer, setAnswer] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState();
  // const [policyID, setPolicyID] = useState();
  const answers = useSelector(store => store.answerReducer);
  // const [currentQuestion, setCurrentQuestion] = useState(0);
  // //const policy = useSelect(store=>store.policy); <-----NEED TO ADD THIS
  // const dispatch = useDispatch();

  useEffect(() => {
    setAnswer(getAnswersForQuestion(props.question.id));
    console.log(`answers are:`, answers)
  });

  const getAnswersForQuestion = (questionID) => {
    for (let i = 0; i < answers.length; i++) {
      if (answers[i].question_id === questionID) {
        return answers[i];
      }
    }
  }

  const handleAnswerChange = (event) => {
    setAnswer(parseInt(event.target.value));
    setCurrentQuestion(event.target.name); //<---Temporarily setting the question for testing purposes. Should be done in useEffect().
  }

  const modifyAnswerForDB = (answer) => {
    console.log(`original answer is:`, answer);

  }
  //   <div>
  //   <input type="radio"
  //     id="answer_1"
  //     name="question_1"
  //     value="1"
  //     onChange={handleAnswerChange}
  //   />
  //   <label for="answer_1">Placeholder 1</label>
  // </div>
  //take question_id field and make these:
  //id = "answer_question_id" --> answer_1
  //name = "question_question_id" --> question_1
  //value = 1

  return (
    <div>
      {JSON.stringify(answer)}
      <h4>{props.question.group}</h4>
      <h4>{props.question.question_text}</h4>
      <p>{JSON.stringify(answer)}</p>



    </div>
  )
}

export default InfoPage;
