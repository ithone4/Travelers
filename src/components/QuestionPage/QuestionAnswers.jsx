import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function QuestionAnswers(props) {
 const [answer, setAnswer] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState();
  // const [policyID, setPolicyID] = useState();
  const answers = useSelector(store => store.answerReducer);
  const user = useSelector(store => store.user);
  // const [currentQuestion, setCurrentQuestion] = useState(0);
  // //const policy = useSelect(store=>store.policy); <-----NEED TO ADD THIS
  // const dispatch = useDispatch();

  useEffect(() => {
    setAnswer(getAnswersForQuestion(props.answer.id));
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
      <h4>{props.answer.id}</h4>
      <div>
      <input type="radio"
            id="answer_1"
            name="question_1"
            value="1"
            onChange={handleAnswerChange}
          />
          <label for="answer_1">{props.answer.answer_1}</label>
          </div>

          <div>
      <input type="radio"
            id="answer_2"
            name="question_2"
            value="2"
            onChange={handleAnswerChange}
          />
          <label for="answer_2">{props.answer.answer_2}</label>
          </div>

          <div>
      <input type="radio"
            id="answer_3"
            name="question_3"
            value="3"
            onChange={handleAnswerChange}
          />
          <label for="answer_3">{props.answer.answer_3}</label>
          </div>

          <div>
      <input type="radio"
            id="answer_4"
            name="question_4"
            value="4"
            onChange={handleAnswerChange}
          />
          <label for="answer_4">{props.answer.answer_4}</label>
          </div>

          <div>
      <input type="radio"
            id="answer_5"
            name="question_5"
            value="5"
            onChange={handleAnswerChange}
          />
          <label for="answer_1">{props.answer.answer_5}</label>
          </div>


    </div>
  )
}

export default QuestionAnswers;
