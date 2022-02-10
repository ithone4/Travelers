import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './QuestionRadioButtons.css';
import Utility from '../../utility';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function QuestionRadioButtons(props) {
    const answersFromStore = useSelector(store => store.answerReducer);
    const [userAnswer, setUserAnswer] = useState('female');
    const [value, setValue] = React.useState('female');
    useEffect(() => {
        console.log(`in useEffect!`);
    }, []);



    const handleChange = (event) => {
        setValue(event.target.value);
        console.log(`event.target.value is:`, event.target.value);
    };

    const getAnswersForQuestion = (questionID) => {
        for (let i = 0; i < answersFromStore.length; i++) {
            if (answersFromStore[i].question_id === questionID) {
                return answersFromStore[i];
            }
        }
    }
    // const handleChange = (event) => {
    //     console.log(`in handleChange and value is:`, event.target.value);
    //     setUserAnswer(event.target.value);
    //     //setUserAnswer(event.target.value);
    // }

    const determineChecked = (radioButtonValue) => {
        console.log(`in determine checked and the radio button value is:`, radioButtonValue);
        if (props.defaultRB == radioButtonValue) {
            console.log(`in the true`);
            return true;
        } else {
            console.log(`in the false`);
            return false;
        }
        //return true or false
    }

    return (
        <div>
            <p>{JSON.stringify(props)}</p>
            {/* <FormControl component="fieldset">
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                    aria-label="gender"
                    name="controlled-radio-buttons-group"
                    value={value}
                    onChange={handleChange}

                >
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                </RadioGroup>
            </FormControl> */}
            {/* {
                Utility.formatAnswersForInput(getAnswersForQuestion(props.questionID)).map((thisAnswer) => (
                    <>
                        <div>
                            <p>{JSON.stringify(thisAnswer.questionName)}</p>

                            <input type="radio"
                                id={thisAnswer.answerName}
                                name={thisAnswer.questionName}
                                value={thisAnswer.answerValue}
                                // defaultValue={thisAnswer.answerValue == props.defaultRB ? true : false}
                                onChange={handleChange}
                            />
                            <label for={thisAnswer.answerName}>{thisAnswer.answerText}</label>
                        </div>
                    </>
                ))
            } */}
        </div>
    );
}

export default QuestionRadioButtons;