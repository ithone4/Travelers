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
    const [defaultAnswer, setDefaultAnswer] = useState();
    const [answersForQuestion, setAnswersForQuestion] = useState({});
    const [companyCulture, setCompanyCulture] = useState();
    let [currentQuestionID, setCurrentQuestionID] = useState(1); //<<-----TODO: LET? Is this right?
    const [companyAnswersForDB, setCompanyAnswersForDB] = useState({});
    const [currentQuestion, setCurrentQuestion] = useState();
    const [policyID, setPolicyID] = useState();
    const [showBackButton, setShowBackButton] = useState(true);
    const [showNextButton, setShowNextButton] = useState(false);
    //BEGIN TESTING MUI RB
    const [defaultRB, setDefaultRB] = useState(2);
    //END TESTING MUI RB
    const GO_BACK = -1;
    const GO_AHEAD = 1;
    /* Reducers */
    const user = useSelector(store => store.user);
    const questions = useSelector(store => store.questionReducer);
    const answersFromStore = useSelector(store => store.answerReducer);
    const companyCultureStore = useSelector(store => store.policyBuilderReducer.companyCultureReducer);
    const companyPolicyStore = useSelector(store => store.policyBuilderReducer.policyBuilderReducer);

    const dispatch = useDispatch();

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
        dispatch({ type: 'FETCH_BUILDER', payload: user.id }); //dispatch call for policy builder move in future to where it makes sense
        dispatch({ type: 'FETCH_COMPANY_CULTURE', payload: user.id });
    }, []);

    const checkForExistingPolicy = () => {
        if (companyPolicyStore.length > 0) {
            setPolicyID(companyPolicyStore[0].id);
            //put these values in temporary object that will get sent to router to update db
            setCompanyAnswersForDB(companyPolicyStore[0]);
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
        saveAnswer(currentQuestionID, answer);


        showHideButtons(direction); //<---BETTER WAY TO DO THIS?
        setCurrentQuestion(questions[currentQuestionID])
        setAnswersForQuestion(Utility.formatAnswersForInput(getAnswersForQuestion(currentQuestionID)));
        setRadioButtonForAnswer(currentQuestionID);
    }
    const setRadioButtonForAnswer = (questionID) => {
        console.log(`In setAnswerRadioButton! questionID is:`, questionID);
        if (policyID === null) {
            console.log(`no policy ID exists for this user --> NEW user`);
            //use the company culture as default for this answer
            setDefaultAnswer(companyCulture);
        } else {
            //check to see if the user already entered an answer for this question and default to that
            let answersFromPolicy = companyPolicyStore[0]; //only ever one
            //setDefaultAnswer(answersFromPolicy.question_1);
            //let questionToSearchFor = `question_${questionID}`;
            let userAnswer = answersFromPolicy[`question_${questionID}`];
            if (userAnswer === null || userAnswer === undefined) {
                setDefaultAnswer(companyCulture);
            } else {
                setDefaultAnswer(userAnswer);
            }
        }
    }
    const startPolicyProcess = () => {
        console.log(`Start Policy Process!`);
        /* THINK ABOUT WHAT TO DO IF USER IS STARTING MID-WAY THROUGH THE QUESTIONNAIRE */
        setCurrentQuestionID(1); // --> This probably needs to change if user is loading halfway done builder
        setCurrentQuestion(questions[currentQuestionID - 1]);
        checkForExistingPolicy();
        setCompanyCulture(companyCultureStore);
    }

    return (
        <div>
            <Container maxWidth>
                <h3>{JSON.stringify(props)}</h3>
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

                        {/* ---> BEGIN Trying something out */}
                        <RadioGroup value={defaultRB}>
                            <FormControlLabel value='1' control={<Radio />} label='RB Number 1' />
                            <FormControlLabel value='2' control={<Radio />} label='RB Number 2' />
                            <FormControlLabel value='3' control={<Radio />} label='RB Number 3' />
                            <FormControlLabel value='4' control={<Radio />} label='RB Number 4' />
                            <FormControlLabel value='5' control={<Radio />} label='RB Number 5' />
                        </RadioGroup>


                        {/* ---> END Trying something out */}

                    </Grid>

                    {/* <h3>{JSON.stringify(companyPolicyStore[0].id)}</h3> */}
                    {/* <h3>{questions[currentQuestionID - 1].question_text}</h3> */}
                    {/* <p>Company culture: {JSON.stringify(companyCulture)}</p> */}
                    {/* <h3>{currentQuestion.question_text}</h3> */}
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
