import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import 'tippy.js/themes/material.css';
import 'tippy.js/animations/perspective.css';
import 'tippy.js/animations/scale.css';
import 'tippy.js/animations/shift-away.css';
import 'tippy.js/animations/shift-toward.css';
import './QuestionPage.css';
import Utility from '../../utility';
import Footer from '../Footer/Footer';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
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
    let questionIDForBuilder;
    /* Constants */
    const GO_BACK = -1;
    const GO_AHEAD = 1;

    useEffect(() => {
        startPolicyProcess();
    }, []);

    const startPolicyProcess = () => {
        //Check if answers in temporary/local store
        if (Object.keys(answersFromTempStore).length != 0) {
            if (answersFromTempStore.answers[`question_1`] !== null) {
                setValue(answersFromTempStore.answers[`question_1`]);
            }
        } else {
            //check to see if user already has a policy that exists in the db
            if (props.companyPolicy[0]) {
                if (Object.keys(props.companyPolicy[0].length > 0)) {
                    setPolicyID(props.companyPolicy[0].id);
                    setUserPolicyAnswers(props.companyPolicy[0]);
                    setValue(props.companyPolicy[0][`question_1`]);
                }
            } else {
                setValue(props.companyCulture);
            }
        }
        setCurrentQuestion(questions[0]);

        //Setup props values so the other Builder components can be updated
        props.updateQuestionId(questionIDForBuilder);
        props.updateGroupName(questions[0].group_name);
        props.updateInfoSnippet(questions[0].info_snippet_text);
        props.setTotalQuestionCount(questions.length);
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
        if (questionIDForBuilder > 1) {
            setShowBackButton(false);
        } else {
            setShowBackButton(true);
        }
        if (questionIDForBuilder === questions.length) {
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
    const saveAnswerToStore = (questionId, answer) => {
        let objectKey = `question_${questionId}`;

        let answersToLoad = { ...answersFromTempStore.answers, [objectKey]: parseInt(answer) };

        let policyIDForPayload;
        if (!policyID) {
            policyIDForPayload = '';
        } else {
            policyIDForPayload = policyID;
        }

        let dataToLoad = {
            id: policyIDForPayload,
            userId: user.id,
            answers: answersToLoad
        }
        //Now send userPolicyAnswers to the temporary store
        dispatch({
            type: 'SAVE_BUILDER_TO_LOCAL',
            payload: dataToLoad
        })
    }
    const handleNextBackButtons = (event, direction) => {
        saveAnswerToStore(currentQuestionID, parseInt(value));
        if (direction === GO_AHEAD) {
            questionIDForBuilder = currentQuestionID + 1;
            setCurrentQuestionID(questionIDForBuilder);
        } else if (direction === GO_BACK) {
            questionIDForBuilder = currentQuestionID - 1;
            setCurrentQuestionID(questionIDForBuilder);
        }
        props.updateGroupName(questions[questionIDForBuilder - 1].group_name);
        props.updateInfoSnippet(questions[questionIDForBuilder - 1].info_snippet_text);
        dispatch({ type: 'SAVE_QUESTION_ID', payload: questionIDForBuilder }); //<---NEED THIS???!!
        showHideButtons();
        setCurrentQuestion(questions[questionIDForBuilder - 1])
        setDefaultRadioButton(questionIDForBuilder);
        props.updateQuestionId(questionIDForBuilder);
    }
    const setDefaultRadioButton = (questionId) => {
        setValue(companyCulture);
        if (Object.keys(userPolicyAnswers).length != 0) {
            if (userPolicyAnswers.hasOwnProperty(`question_${questionId}`) &&
                userPolicyAnswers[`question_${questionId}`] != null) {
                setValue(userPolicyAnswers[`question_${questionId}`]);
            }
        }
        if (Object.keys(answersFromTempStore).length != 0) {
            if (answersFromTempStore.answers.hasOwnProperty(`question_${questionId}`)) {
                setValue(answersFromTempStore.answers[`question_${questionId}`]);
            }
        }
    }

    const CustomWidthTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))({
        [`& .${tooltipClasses.tooltip}`]: {
            maxWidth: 500,
        },
    });

    return (
        <div>
            <Container maxWidth>
                <Grid
                    container
                    direction="column"
                >
                    <Grid item xs={1}
                        sx={{ padding: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography variant="h5">
                                {questions[currentQuestionID - 1].question_text}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={10}
                    >
                        <FormControl component="fieldset">
                            <RadioGroup column
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
                                                control={<Radio />}
                                                label={
                                                    <Box sx={{ ml: 2 }}
                                                        className='module-answer line-clamp-answer'>
                                                        <Tippy className='tippy-tooltip'
                                                            placement='top'
                                                            content={< span > {thisAnswer.answerText}</span >}
                                                            arrow={true}
                                                            arrowType='sharp'
                                                            maxWidth={800}
                                                            theme='material'
                                                            animation='scale'
                                                            trigger='click'
                                                        >
                                                            <p>{thisAnswer.answerText}</p>
                                                        </Tippy >
                                                    </Box>}
                                            />
                                        </>
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={1}
                        sx={{ padding: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                            <Button variant="contained"
                                disabled={showBackButton}
                                onClick={(event) => { handleNextBackButtons(event, GO_BACK) }}
                                sx={{ mr: 2 }}>
                                Back
                            </Button>
                            <Button variant="contained"
                                disabled={showNextButton}
                                onClick={(event) => { handleNextBackButtons(event, GO_AHEAD) }}>
                                Next
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <div>
                <Footer question={questions[currentQuestionID]} />
            </div>
        </div >
    );
}

export default QuestionPage;