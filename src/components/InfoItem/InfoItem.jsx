import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './InfoItem.css';
import Utility from '../../utility';


function InfoPage(props) {
  const answers = useSelector(store => store.answerReducer);

  useEffect(() => {
    console.log(`in useEffect`);
  }, []);

  const getAnswersForQuestion = (questionID) => {
    for (let i = 0; i < answers.length; i++) {
      if (answers[i].question_id === questionID) {
        return answers[i];
      }
    }
  }

  const handleAnswerChange = (event) => {
    console.log(`in handleAnswerChange!`);
  }


  return (
    <div>
      <h4>{props.question.question_text}</h4>
      {
        props.answers.map((thisAnswer) => (
          <><div>
            <input type="radio"
              id={thisAnswer.answerName}
              name={thisAnswer.questionName}
              value={thisAnswer.answerValue}
              onChange={handleAnswerChange} />
            <label for="answer_1">{thisAnswer.answerText}</label>
          </div></>
        ))
      }
    </div>
  )
}
export default InfoPage;
