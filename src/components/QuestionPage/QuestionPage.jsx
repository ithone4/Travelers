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
    let questionIDForBuilder;
    /* Constants */
    const GO_BACK = -1;
    const GO_AHEAD = 1;

    useEffect(() => {
        startPolicyProcess();
    }, []);

    const startPolicyProcess = () => {
        console.log(`in startPolicyProcess and props.companyPolicy is:`, props.companyPolicy[0]);
        console.log(`in startPolicyProcess and answersFromTempStore is:`, answersFromTempStore);
        // if (props.companyPolicy[0]) {
        //     console.log(`there is a policy. need to check now if it has anything in it`)
        //     if (Object.keys(props.companyPolicy[0].length > 0)) {
        //         console.log(`found a company policy!`, props.companyPolicy[0])
        //         setPolicyID(props.companyPolicy[0].id);
        //         //put these values in temporary object that will get sent to router to update db
        //         setUserPolicyAnswers(props.companyPolicy[0]);
        //         setValue(props.companyPolicy[0][`question_1`]);
        //     }
        // } else {
        //     if (!answersFromTempStore) {
        //         if (Object.keys(answersFromTempStore).length != 0) {
        //             if (answersFromTempStore.answers[`question_${questionId}`] !== null) {
        //                 console.log(`found a value in temp:`, answersFromTempStore.answers[`question_${questionId}`])
        //                 setValue(answersFromTempStore.answers[`question_${questionId}`]);
        //             }
        //             //Check if answers in DB
        //         }
        //     }            
        // }
        //Check if answers in temporary/local store

        if (Object.keys(answersFromTempStore).length != 0) {
            if (answersFromTempStore.answers[`question_1`] !== null) {
                console.log(`found a value in temp:`, answersFromTempStore.answers[`question_1`])
                setValue(answersFromTempStore.answers[`question_1`]);
            }
        } else {
            console.log(`in else of startPolicyProcess`)
            if (props.companyPolicy[0]) {
                console.log(`in startPolicyProcess there is a policy. need to check now if it has anything in it`)
                if (Object.keys(props.companyPolicy[0].length > 0)) {
                    console.log(`found a company policy!`, props.companyPolicy[0])
                    setPolicyID(props.companyPolicy[0].id);
                    //put these values in temporary object that will get sent to router to update db
                    setUserPolicyAnswers(props.companyPolicy[0]);
                    setValue(props.companyPolicy[0][`question_1`]);
                }
            } else {
                console.log(`going to use companyculture`)
                setValue(props.companyCulture);
            }
        }

        setCurrentQuestion(questions[0]);
        props.updateQuestionId(questionIDForBuilder);
        props.updateGroupName(questions[0].group_name);
        props.updateInfoSnippet(questions[0].info_snippet_text);
    }
    const handleChange = (event) => {
        setValue(event.target.value);
        setAnswer(parseInt(event.target.value));
        /* Adding save here in case user chooses to hit 'save & return to main menu' 
        and didn't click on the next button*/
        console.log(`in handleChange. questionis:`, currentQuestionID, `and value is:`, event.target.value);
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
    const saveAnswerToStore = (questionID, answer) => {
        console.log(`in saveAnswerToStore and userPolicyAnswers is:`, userPolicyAnswers);
        let objectKey = `question_${questionID}`;

        //setUserPolicyAnswers({ ...userPolicyAnswers, [objectKey]: parseInt(answer) }); 
        /* Change not happening fast enough for reducer (using set) so will use this way instead. */





        /* Feb. 12 8:45 PM END TRYING THIS */
        setUserPolicyAnswers(
            userPolicyAnswers[objectKey] = parseInt(answer)
        );
        setUserPolicyAnswers({ ...userPolicyAnswers });
        console.log(`in saveAnswerToStore AFTER SET and userPolicyAnswers is:`, userPolicyAnswers);

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
        console.log(`going to dispatch this dataToLoad to sage:`, dataToLoad);
        //Now send userPolicyAnswers to the store
        dispatch({
            type: 'SAVE_BUILDER_TO_LOCAL',
            payload: dataToLoad
        })
    }
    const handleNextBackButtons = (event, direction) => {
        props.updateGroupName(currentQuestion.group_name);
        props.updateInfoSnippet(currentQuestion.info_snippet_text);
        saveAnswerToStore(currentQuestionID, parseInt(value));
        if (direction === GO_AHEAD) {
            questionIDForBuilder = currentQuestionID + 1;
            setCurrentQuestionID(questionIDForBuilder);
        } else if (direction === GO_BACK) {
            questionIDForBuilder = currentQuestionID - 1;
            setCurrentQuestionID(questionIDForBuilder);
        }
        dispatch({ type: 'SAVE_QUESTION_ID', payload: questionIDForBuilder }); //<---NEED THIS???!!
        showHideButtons();
        setCurrentQuestion(questions[questionIDForBuilder - 1])
        setDefaultRadioButton(questionIDForBuilder);

        //Sending the question id back to Builder so it can use it to set the correct group name
        //and info snippet
        //Using questionIDForBuilder b/c screen is rendering quicker than state gets updated.
        props.updateQuestionId(questionIDForBuilder);
    }
    const setDefaultRadioButton = (questionId) => {
        console.log(`in setDefaultRadioButton`)
        console.log(`questionID in parameter is:`, questionId);
        console.log(`userPolicyAnswers is:`, userPolicyAnswers);
        console.log(`answersFromTempStore is:`, answersFromTempStore);
        console.log(`length of key in answersFromTempStore`, Object.keys(answersFromTempStore).length);
        //console.log(`answersFromTempStore is:`, answersFromTempStore.answers[`question_${questionId}`]);
        //console.log(`length of answersFromTempStore is:`, Object.keys(answersFromTempStore).length);

        setValue(companyCulture);
        if (Object.keys(userPolicyAnswers).length != 0) {
            // if (userPolicyAnswers[`question_${questionId}`] !== null) {
            //     console.log(`found a value in DB:`, userPolicyAnswers[`question_${questionId}`])
            //     setValue(userPolicyAnswers[`question_${questionId}`]);
            // }
            //hasOwnProperty('name')
            if (userPolicyAnswers.hasOwnProperty(`question_${questionId}`)) {
                console.log(`found a value in DB:`, userPolicyAnswers[`question_${questionId}`])
                setValue(userPolicyAnswers[`question_${questionId}`]);
            }
        }
        if (Object.keys(answersFromTempStore).length != 0) {
            if (answersFromTempStore.hasOwnProperty(`question_${questionId}`)) {
                console.log(`found a value in temp:`, answersFromTempStore.answers[`question_${questionId}`])
                setValue(answersFromTempStore.answers[`question_${questionId}`]);
            }
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