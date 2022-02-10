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
import FormControl from '@mui/material/FormControl';

function QuestionPage(props) {
    const [answer, setAnswer] = useState('');
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
    let questionIDForButtons;
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
            console.log(`answers from DB look like this:`, companyAnswersForDB);
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
        console.log(`in getAnswersForQuestion`);
        for (let i = 0; i < answersFromStore.length; i++) {
            if (answersFromStore[i].question_id === questionID) {
                return answersFromStore[i];
            }
        }
    }
    const saveAnswer = (questionID, answer) => {
        console.log(`in saveAnswer with questionID:`, questionID, `and answer:`, answer);
        let objectKey = '';
        // console.log(`temp array looks like this:`, companyAnswersForDB);
        // console.log(`corresponding value in temp array is:`, companyAnswersForDB[`question_${questionID}`]);
        if (companyAnswersForDB[`question_${questionID}`] === null) {
            console.log(`value doesn't exist, create new one`);
            objectKey = `question_${questionID}`;
            //setCompanyAnswersForDB({ ...companyAnswersForDB, question_7: parseInt(answer) }); //<---WORKS!!!
            setCompanyAnswersForDB({ ...companyAnswersForDB, [objectKey]: parseInt(answer) }); //<---WORKS!!!
        } else {
            console.log(`value exists, overwrite it`);
            objectKey = `question_${questionID}`;
            //setCompanyAnswersForDB({ ...companyAnswersForDB, question_7: parseInt(answer) }); //<---WORKS!!!
            setCompanyAnswersForDB({ ...companyAnswersForDB, [objectKey]: parseInt(answer) }); //<---WORKS!!!
        }
    }
    const handleNextBackButtons = (event, direction) => {
        console.log(`in handleNextBackButtons!`);
        //Increase/decrese the question ID depending on button clicked
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
        console.log(`in startPolicyProcess!`);
        setCurrentQuestionID(1); // --> This probably needs to change if user is loading halfway done builder
        setCurrentQuestion(questions[currentQuestionID - 1]); //<--Get question at index 0 (first question)
        setValue(companyCulture)
        if (companyAnswersForDB[`question_1`] !== null) {
            setValue(companyAnswersForDB[`question_1`]);
        }
    }
    const setDefaultRadioButton = (questionID) => {
        if (companyAnswersForDB[`question_${questionID}`] === null) {
            setValue(props.companyCulture)
        } else {
            setValue(companyAnswersForDB[`question_${questionID}`]);
        }
    }

    return (
        <div>
            <Container maxWidth>
                {/* <h4>{JSON.stringify(props.companyPolicy)}</h4>
                <h4>{JSON.stringify(props.companyCulture)}</h4> */}
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
                                    Utility.formatAnswersForInput(getAnswersForQuestion(currentQuestionID)).map((thisAnswer) => (
                                        <>
                                            {/* <h4>{JSON.stringify(thisAnswer)}</h4> */}
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