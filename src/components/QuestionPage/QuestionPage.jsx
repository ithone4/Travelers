import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './QuestionPage.css';
import Utility from '../../utility';
import Footer from '../Footer/Footer';
import { SettingsOverscanOutlined } from '@mui/icons-material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import QuestionRadioButtons from '../QuestionRadioButtons/QuestionRadioButtons';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function QuestionPage(props) {
    const [answer, setAnswer] = useState('');
    const [answersForQuestion, setAnswersForQuestion] = useState([]);
    const [companyCulture, setCompanyCulture] = useState(props.companyCulture);
    const [currentQuestionID, setCurrentQuestionID] = useState(1);
    const [companyAnswersForDB, setCompanyAnswersForDB] = useState({});
    const [currentQuestion, setCurrentQuestion] = useState();
    const [policyID, setPolicyID] = useState();
    const [showBackButton, setShowBackButton] = useState(true);
    const [showNextButton, setShowNextButton] = useState(false);
    //const [value, setValue] = React.useState('female'); <-- Don't erase. Use for testing radio button functionality
    const [value, setValue] = React.useState(props.companyCulture);

    /* Reducers */
    const user = useSelector(store => store.user);
    const questions = useSelector(store => store.questionReducer);
    const answersFromStore = useSelector(store => store.answerReducer);
    const dispatch = useDispatch();
    let IDForButtons;

    let nextQuestionID,
        lastQuestionID;

    /* Constants */
    const GO_BACK = -1;
    const GO_AHEAD = 1;

    useEffect(() => {
        console.log(`in useEffect!`);
        checkForExistingPolicy();
    }, []);

    const checkForExistingPolicy = () => {
        console.log(`in checkForExistingPolicy`);
        if (props.companyPolicy.length > 0) {
            setPolicyID(props.companyPolicy[0].id);
            //put these values in temporary object that will get sent to router to update db
            setCompanyAnswersForDB(props.companyPolicy[0]);
        }
    }
    const handleChange = (event) => {
        console.log(`in handleChange and event.target.value is:`, event.target.value);
        setValue(event.target.value);
        setAnswer(parseInt(event.target.value));
        saveAnswer(currentQuestionID, event.target.value)
    };
    const onSubmit = () => {
        console.log(`in onSubmit!`);
        //TODO: Reformat the answers for the DB!!!!!!
        //reformat question id for saving
        let questionColumnName = `question_${currentQuestion.id}`;
        dispatch({
            type: 'SAVE_TO_BUILDER',
            payload: {
                id: policyID,
                userID: user.id,
                answers: [{
                    question: currentQuestion,
                    answer: answer
                }]
            }
        })
    }
    const showHideButtons = (direction) => {
        console.log(`in showHideButtons and the currentQuestionID is:`, currentQuestionID);

        //Show/hide next and back buttons if necessary
        if (IDForButtons > 1) {
            setShowBackButton(false);
        } else {
            setShowBackButton(true);
        }
        if (IDForButtons === questions.length) {
            setShowNextButton(true);
        } else {
            setShowNextButton(false);
        }
    }
    const getAnswersForQuestion = (questionID) => {
        console.log(`in getAnswersForQuestion!`);
        for (let i = 0; i < answersFromStore.length; i++) {
            if (answersFromStore[i].question_id === questionID) {
                return answersFromStore[i];
            }
        }
    }
    //TODO:
    const saveAnswer = (questionID, answer) => {
        console.log(`in saveAnswer with questionID:`, questionID, `and answer:`, answer);
        // console.log(`temp array looks like this:`, companyAnswersForDB);
        // console.log(`corresponding value in temp array is:`, companyAnswersForDB[`question_${questionID}`]);
        // if (companyAnswersForDB[`question_${questionID}`] === null) {
        //     console.log(`value never existed, add a new one`);
        // } else {
        //     console.log(`value exists, overwrite it`);
        // }
    }
    const handleNextBackButtons = (event, direction) => {
        console.log(`in handleNextBackButtons!`);
        //On click of these buttons, we need to go to our temporary array and update it with the value
        //on the screen (for this current question)
        //saveAnswer(currentQuestionID, answer);

        //Increase/decrese the question ID depending on button clicked
        if (direction === GO_AHEAD) {
            IDForButtons = currentQuestionID + 1;
            setCurrentQuestionID(currentQuestionID => currentQuestionID + 1);
        } else if (direction === GO_BACK) {
            IDForButtons = currentQuestionID - 1;
            setCurrentQuestionID(currentQuestionID => currentQuestionID - 1);
        }
        console.log(`next questionID is:`, currentQuestionID);

        showHideButtons(); //<---BETTER WAY TO DO THIS?
        setCurrentQuestion(questions[currentQuestionID - 1])
        //setAnswersForQuestion(Utility.formatAnswersForInput(getAnswersForQuestion(currentQuestionID)));
        //setRadioButtonForAnswer(currentQuestionID);

        //FEB. 10 TESTING
        //setValue("1") --> WORKS with example from MateriaulUI
        //setValue(companyCulture)
        setDefaultRadioButton(currentQuestionID);
    }
    const startPolicyProcess = () => {
        console.log(`in startPolicyProcess!`);

        /* ---> BEGIN FEB.10 TRYING SOMETHING HERE */
        nextQuestionID = 2;
        /* ---> END FEB.10 TRYING SOMETHING HERE */


        /* THINK ABOUT WHAT TO DO IF USER IS STARTING MID-WAY THROUGH THE QUESTIONNAIRE */
        setCurrentQuestionID(1); // --> This probably needs to change if user is loading halfway done builder
        setCurrentQuestion(questions[currentQuestionID - 1]); //<--Get question at index 0 (first question)
        //checkForExistingPolicy(); --> DOING THIS IN USE EFFECT NOW
        //setRadioButtonForAnswer(1);
        //FEB. 10 TESTING
        //setValue("1") --> WORKS with example from MateriaulUI
        setValue(companyCulture)
        if (companyAnswersForDB[`question_1`] !== null) {
            setValue(companyAnswersForDB[`question_1`]);
        }
    }
    const setDefaultRadioButton = (questionID) => {
        // console.log(`in setDefaultRadioButton`)
        // console.log(`corresponding value in temp array is:`, companyAnswersForDB[`question_${questionID}`]);
        if (companyAnswersForDB[`question_${questionID}`] === null) {
            setValue(props.companyCulture)
        } else {
            // console.log(`value exists, overwrite it`);
            setValue(companyAnswersForDB[`question_${questionID}`]);
            //setValue(4);
        }
    }

    return (
        <div>
            <Container maxWidth>
                <h4>{JSON.stringify(props.companyPolicy)}</h4>
                <h4>{JSON.stringify(props.companyCulture)}</h4>
                <Grid
                    container
                    direction="column"
                    sx={{ border: 1 }}
                >
                    <Grid item xs={1}
                        sx={{ border: 1, padding: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography variant="h5">
                                {questions[currentQuestionID - 1].question_text}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={10}
                        sx={{ border: 1 }}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Gender</FormLabel>
                            <RadioGroup
                                aria-label="gender"
                                name="controlled-radio-buttons-group"
                                value={value}
                                onChange={handleChange}

                            >
                                {/* THIS WORKS! DO NOT ERASE -> Working example with dummy data
                                 <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="other" control={<Radio />} label="Other" /> */}
                                {
                                    Utility.formatAnswersForInput(getAnswersForQuestion(currentQuestionID)).map((thisAnswer) => (
                                        <>
                                            <FormControlLabel
                                                id={thisAnswer.answerName}
                                                name={thisAnswer.questionName}
                                                value={thisAnswer.answerValue}
                                                control={<Radio />} label={thisAnswer.answerText}
                                            />
                                        </>
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid
                        container
                        direction="rows"
                        sx={{ border: 1 }}
                    >
                        <button disabled={showBackButton}
                            onClick={(event) => { handleNextBackButtons(event, GO_BACK) }}>
                            Back
                        </button>
                        <button disabled={showNextButton}
                            onClick={(event) => { handleNextBackButtons(event, GO_AHEAD) }}>
                            Next
                        </button>
                        {/* <p>
                            <button onClick={onSubmit}>Submit</button>
                        </p> */}
                        <p>
                            <button onClick={startPolicyProcess}>CLICK HERE TO START</button>
                        </p>
                    </Grid>
                </Grid>
            </Container>
            <div>
                <Footer question={questions[currentQuestionID]} />
            </div>
        </div>
    );
}

export default QuestionPage;