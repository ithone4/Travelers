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

function QuestionPage(props) {
    const [answer, setAnswer] = useState('');
    const [defaultRB, setdefaultRB] = useState('3');
    const [answersForQuestion, setAnswersForQuestion] = useState({});
    const [companyCulture, setCompanyCulture] = useState(props.culture);
    let [currentQuestionID, setCurrentQuestionID] = useState(1); //<<-----TODO: LET? Is this right?
    const [companyAnswersForDB, setCompanyAnswersForDB] = useState({});
    const [currentQuestion, setCurrentQuestion] = useState();
    const [policyID, setPolicyID] = useState();
    const [showBackButton, setShowBackButton] = useState(true);
    const [showNextButton, setShowNextButton] = useState(false);
    //BEGIN TESTING MUI RB

    //END TESTING MUI RB
    const GO_BACK = -1;
    const GO_AHEAD = 1;
    /* Reducers */
    const user = useSelector(store => store.user);
    const questions = useSelector(store => store.questionReducer);
    const answersFromStore = useSelector(store => store.answerReducer);
    //const companyCultureStore = useSelector(store => store.policyBuilderReducer.companyCultureReducer);
    //const companyPolicyStore = useSelector(store => store.policyBuilderReducer.policyBuilderReducer);

    const dispatch = useDispatch();

    let rb = props.culture;

    //let companyAnswersForDB = [];
    //THIS IS WHAT IT LOOKS LIKE TO GO TO THE DB
    // let answersForDB = {
    //     id: 1,
    //     userID: 4,
    //     answers: [
    //         {
    //             question_1: 'how do you do?',
    //             answer: 'i am well, thanks'
    //         },
    //         {
    //             question_2: 'what did you eat for breakfast?',
    //             answer: 'i had a toast'
    //         }
    //     ]
    // };

    useEffect(() => {
        console.log(`in useEffect!`);
        // dispatch({ type: 'FETCH_BUILDER', payload: user.id }); //dispatch call for policy builder move in future to where it makes sense
        //dispatch({ type: 'FETCH_COMPANY_CULTURE', payload: user.id });
    }, []);

    const checkForExistingPolicy = () => {
        if (props.companyPolicy.length > 0) {
            setPolicyID(props.companyPolicy[0].id);
            //put these values in temporary object that will get sent to router to update db
            setCompanyAnswersForDB(props.companyPolicy[0]);
            console.log(`the temporary array of answers is:`, companyAnswersForDB);
        }
    }
    const onSubmit = () => {
        //TODO: Reformat the answers for the DB!!!!!!
        //reformat question id for saving
        let questionColumnName = `question_${currentQuestion.id}`;
        console.log(`question column name is:`, questionColumnName);
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
    const handleAnswerChange = (event) => {
        console.log(`in handleAnswerChange with event:`, event);
        setAnswer(parseInt(event.target.value));
        setCurrentQuestion(event.target.name); //<---Temporarily setting the question for testing purposes. Should be done in useEffect().
        saveAnswer(currentQuestionID, event.target.value)
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
    const getAnswersForQuestion = (questionID) => {
        for (let i = 0; i < answersFromStore.length; i++) {
            if (answersFromStore[i].question_id === questionID) {
                return answersFromStore[i];
            }
        }
    }
    //TODO:
    const saveAnswer = (questionID, answer) => {
        console.log(`in saveAnswer with questionID:`, questionID, `and answer:`, answer);
        //update the companyAnswersForDB with this questionID and answer
        console.log(`temp array looks like this:`, companyAnswersForDB);
        console.log(`corresponding value in temp array is:`, companyAnswersForDB[`question_${questionID}`]);
        if (companyAnswersForDB[`question_${questionID}`] === null) {
            console.log(`value never existed, add a new one`);
        } else {
            console.log(`value exists, overwrite it`);
        }
    }
    const handleNextBackButtons = (event, direction) => {
        //On click of these buttons, we need to go to our temporary array and update it with the value
        //on the screen (for this current question)
        //saveAnswer(currentQuestionID, answer);


        showHideButtons(direction); //<---BETTER WAY TO DO THIS?
        setCurrentQuestion(questions[currentQuestionID])
        setAnswersForQuestion(Utility.formatAnswersForInput(getAnswersForQuestion(currentQuestionID)));
        //setRadioButtonForAnswer(currentQuestionID);
    }
    const setRadioButtonForAnswer = (questionID) => {
        console.log(`In setAnswerRadioButton! questionID is:`, questionID);
        let answersFromPolicy = props.companyPolicy[0]; //only ever one
        console.log(`props.companyPolicy are:`, props.companyPolicy);

        if (props.companyPolicy.length > 0) {

            // if (policyID === null) {
            //     console.log(`no policy ID exists for this user --> NEW user`);
            //     //use the company culture as default for this answer
            //     setdefaultRB(companyCulture);
            // } else {
            //check to see if the user already entered an answer for this question and default to that

            //setdefaultRB(answersFromPolicy.question_1);
            //let questionToSearchFor = `question_${questionID}`;
            let userAnswer = answersFromPolicy[`question_${questionID}`];
            console.log(`userAnswer is:`, userAnswer)
            // if (userAnswer === null || userAnswer === undefined) {
            //     setdefaultRB('3')
            // } else {
            //     setdefaultRB(userAnswer);
            // }
        }
        // }
    }
    const startPolicyProcess = () => {
        console.log(`Start Policy Process!`);
        /* THINK ABOUT WHAT TO DO IF USER IS STARTING MID-WAY THROUGH THE QUESTIONNAIRE */
        setCurrentQuestionID(1); // --> This probably needs to change if user is loading halfway done builder
        setRadioButtonForAnswer(1);
        setCurrentQuestion(questions[currentQuestionID - 1]);
        checkForExistingPolicy();
        setCompanyCulture(props.companyCulture);

    }
    const determineRBEnabled = (answer) => {
        console.log(`determineRBEnabled and answer is:`, answer);
        if (answer == defaultRB) {
            return true;
        } else {
            return false;
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
                        <RadioGroup defaultValue={defaultRB}
                            onChange={(event) => { saveAnswer(currentQuestionID, event.target.value) }} >
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