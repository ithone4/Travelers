import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './QuestionPage.css';
import Utility from '../../utility';
import Footer from '../Footer/Footer';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

function QuestionPage(props) {
    const [answer, setAnswer] = useState('');
    const [companyCulture, setCompanyCulture] = useState(props.companyCulture);
    const [currentQuestionID, setCurrentQuestionID] = useState(1);
    const [userPolicyAnswers, setUserPolicyAnswers] = useState({});
    const [currentQuestion, setCurrentQuestion] = useState();
    const [policyID, setPolicyID] = useState();
    const [showBackButton, setShowBackButton] = useState(true);
    const [showNextButton, setShowNextButton] = useState(false);
    const [value, setValue] = useState(props.companyCulture);

    /* Reducers */
    const user = useSelector(store => store.user);
    const questions = useSelector(store => store.questionReducer);
    const radioButtonChoices = useSelector(store => store.answerReducer);
    const answersFromTempStore = useSelector(store => store.policyBuilderReducer.tempPolicyReducer);
    const dispatch = useDispatch();
    let questionIDForButtons;
    /* Constants */
    const GO_BACK = -1;
    const GO_AHEAD = 1;

    useEffect(() => {
        console.log(`in useEffect`);
        checkForExistingPolicy();
        startPolicyProcess();
    }, []);

    const checkForExistingPolicy = () => {
        // -->TODO: Make prop from Builder only the company policy ID. Then, check to see if the
        // prop has a value, if yes, then use FETCH_BUILDER.
        if (props.companyPolicy.length > 0) {
            setPolicyID(props.companyPolicy[0].id);
            //put these values in temporary object that will get sent to router to update db
            setUserPolicyAnswers(props.companyPolicy[0]);
        }
    }
    const handleChange = (event) => {
        setValue(event.target.value);
        setAnswer(parseInt(event.target.value));
        /* Adding save here in case user chooses to hit 'save & return to main menu' 
        and didn't click on the next button*/
        saveAnswerToStore(currentQuestionID, event.target.value);
    };
    const showHideButtons = (direction) => {
        //Show/hide next and back buttons if necessary
        if (questionIDForButtons > 1) {
            setShowBackButton(false);
        } else {
            setShowBackButton(true);
        }
        if (questionIDForButtons === questions.length) {
            setShowNextButton(true);
        } else {
            setShowNextButton(false);
        }
    }
    const getAnswersForQuestion = (questionID) => {
        for (let i = 0; i < radioButtonChoices.length; i++) {
            if (radioButtonChoices[i].question_id === questionID) {
                return radioButtonChoices[i];
            }
        }
    }
    //This function takes the answers input my the user and puts them in a reducer.
    //Save & Exit functionality can then access the users answers from the navigation bar.
    const saveAnswerToStore = (questionID, answer) => {
        let objectKey = `question_${questionID}`;

        //setUserPolicyAnswers({ ...userPolicyAnswers, [objectKey]: parseInt(answer) }); 
        /* Change not happening fast enough for reducer (using set) so will use this way instead. */
        setUserPolicyAnswers(
            userPolicyAnswers[objectKey] = parseInt(answer)
        );
        setUserPolicyAnswers({ ...userPolicyAnswers });

        let policyIDForPayload;
        if (!policyID) {
            policyIDForPayload = '';
        } else {
            policyIDForPayload = policyID;
        }
        let dataToLoad = {
            id: policyIDForPayload,
            userId: user.id,
            answers: userPolicyAnswers
        }

        //Now send userPolicyAnswers to the store
        dispatch({
            type: 'SAVE_BUILDER_TO_LOCAL',
            payload: dataToLoad
        })
    }
    const handleNextBackButtons = (event, direction) => {
        saveAnswerToStore(currentQuestionID, value);
        if (direction === GO_AHEAD) {
            questionIDForButtons = currentQuestionID + 1;
            setCurrentQuestionID(questionIDForButtons);
        } else if (direction === GO_BACK) {
            questionIDForButtons = currentQuestionID - 1;
            setCurrentQuestionID(questionIDForButtons);
        }
        showHideButtons();
        setCurrentQuestion(questions[currentQuestionID - 1])
        setDefaultRadioButton(questionIDForButtons);

    }
    const startPolicyProcess = () => {
        console.log(`in startPolicyProcess`)
        setCurrentQuestionID(1); // --> This probably needs to change if user is loading halfway done builder
        setCurrentQuestion(questions[currentQuestionID - 1]); //<--Get question at index 0 (first question)
        setValue(companyCulture)
        if (userPolicyAnswers[`question_1`] !== null) {
            setValue(userPolicyAnswers[`question_1`]);
        }
    }
    const setDefaultRadioButton = (questionID) => {

        console.log(`userPolicyAnswers is:`, userPolicyAnswers);
        //userPolicyAnswers doesn't exist so set to default company culture
        if (userPolicyAnswers.length === 0) {
            console.log(`in if of userPolicyAnswer.length === 0`);
            setValue(props.companyCulture);
        } else if (!userPolicyAnswers.hasOwnProperty(`question_${questionID}`)) {
            console.log(`in if of userPolicyAnswer doesn't have the key for ${questionID}`);
            setValue(props.companyCulture);
        } else if (userPolicyAnswers[`question_${questionID}`] === null) {
            console.log(`in if of userPolicyAnswer is null`);
            setValue(props.companyCulture)
        } else {
            console.log(`in else and we've found a value for ${questionID}`);
            setValue(userPolicyAnswers[`question_${questionID}`]);
        }
    }
    const saveUserAnswersToDatabase = () => {
        let policyArray = Utility.formatPolicyAnswersForDatabase(answersFromTempStore);
        try {
            dispatch({ type: 'SAVE_BUILDER_TO_DB', payload: policyArray });
            console.log(`Successfully saved policy answers to database!`);
        } catch (error) {
            console.log(`error saving policy answers to database`);
        }
    }
    return (
        <div>
            {/* <button onClick={saveUserAnswersToDatabase}>Get Answers From Store & Push to DB</button> */}
            <Container maxWidth>
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
                            <RadioGroup
                                aria-label="policy-answer"
                                value={value}
                                onChange={handleChange}
                            >
                                {
                                    Utility.formatAnswersForBuilder(getAnswersForQuestion(currentQuestionID)).map((thisAnswer) => (
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
                        <p>
                            <button onClick={startPolicyProcess}>CLICK HERE TO START</button>
                        </p>
                    </Grid>
                </Grid>
            </Container>
            {/* <div>
                <Footer question={questions[currentQuestionID]} />
            </div> */}
        </div>
    );
}

export default QuestionPage;