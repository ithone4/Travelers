import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';
import './QuestionPage.css';
import Utility from '../../utility';
import Footer from '../Footer/Footer';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
// ---> BEGIN ADD TO NAV BAR
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
// <--- END ADD TO NAV BAR

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
    // ---> BEGIN ADD TO NAV BAR
    const [openSaveDialogue, setOpenSaveDialogue] = useState(false);
    const [snackbarState, setSnackbarState] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    // <--- END ADD TO NAV BAR

    /* Reducers */
    const user = useSelector(store => store.user);
    const questions = useSelector(store => store.questionReducer);
    const radioButtonChoices = useSelector(store => store.answerReducer);
    const answersFromTempStore = useSelector(store => store.policyBuilderReducer.tempPolicyReducer);
    const params = useParams();
    const dispatch = useDispatch();
    let questionIDForBuilder;
    /* Constants */
    const GO_BACK = -1;
    const GO_AHEAD = 1;
    
    useEffect(() => {
        console.log('params id:', Number(params.id));
        setCurrentQuestionID(Number(params.id));
    }, []);

    useEffect(() => {
        startPolicyProcess();
    }, []);

    const startPolicyProcess = () => {
        //Check if answers in temporary/local store
        console.log('setting value: not in if line 70');
        if (Object.keys(answersFromTempStore).length != 0) {
            console.log('setting value: in first if line 70');
            if (answersFromTempStore.answers[`question_${Number(params.id)}`] !== null && answersFromTempStore.answers[`question_${Number(params.id)}`] !== undefined ) {
                console.log('setting value: in 2nd if line 70',answersFromTempStore.answers);
                console.log('setting value:', answersFromTempStore.answers[`question_${Number(params.id)}`]);
                setValue(answersFromTempStore.answers[`question_${Number(params.id)}`]);
            }else {
                console.log('in if else ','user.culture', user.culture);
                setValue(user.culture);
            }

        } else {
            console.log('setting value: in else line 70');
            //check to see if user already has a policy that exists in the db
            if (props.companyPolicy[0]) {
                console.log('else if ');
                if (Object.keys(props.companyPolicy[0].length > 0)) {
                    console.log('else if if');
                    setPolicyID(props.companyPolicy[0].id);
                    setUserPolicyAnswers(props.companyPolicy[0]);
                    if (props.companyPolicy[0][`question_${Number(params.id)}`] !== null && props.companyPolicy[0][`question_${Number(params.id)}`] !== undefined ){
                    setValue(props.companyPolicy[0][`question_${Number(params.id)}`]);

                    }else {
                        setValue(user.culture);
                    }//end else
                }
                
            } else {
                //console.log('in else else',user.culture);
                console.log('in else else','user.culture', user.culture);
                //setValue(props.companyCulture);
                setValue(user.culture);
            }
        }
        setCurrentQuestion(questions[Number(params.id)-1]);

        //Setup props values so the other Builder components can be updated
        props.updateQuestionId(questionIDForBuilder);
        props.updateGroupName(questions[Number(params.id)-1].group_name);
        props.updateInfoSnippet(questions[Number(params.id)-1].info_snippet_text);
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

    /******** ------> BEGIN TESTING OF NEW MODAL */
    const saveDoc = () => {
        console.log(`in save and answersFromTempStore are:`, answersFromTempStore);
        let policyArray = Utility.formatPolicyAnswersForDatabase(answersFromTempStore);
        console.log(`in save of UserPage and policyArray is:`, policyArray);
        if (policyArray.answers.length != 0) {
            try {
                dispatch({ type: 'SAVE_BUILDER_TO_DB', payload: policyArray });
                setOpenSaveDialogue(false); /* <---ADD TO NAV BAR */
                console.log(`about to set snackbar message`)
                setSnackbarMessage('Answers successfully saved!')
                setSnackbarState(true);
            } catch (error) {
                console.log(`error saving policy answers to database`);
            }
        }
    }
    /* <---START ADD TO NAV BAR */
    const handleSave = () => {
        setOpenSaveDialogue(true);
    }
    const handleCloseSaveDialogue = () => {
        setOpenSaveDialogue(false);
    }
    const handleCloseSnackbar = () => {
        setSnackbarState(false);
    }
    /* <---END ADD TO NAV BAR */
    /******** <------END TESTING OF NEW MODAL */

    return (
        <div>
            <button onClick={handleSave}>Save</button>
            {/*  ---> BEGIN ADD TO NAV BAR  */}
            <Snackbar open={snackbarState}
                autoHideDuration={5000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ horizontal: 'center', vertical: 'top' }}>
                <Alert
                    elevation={6}
                    onClose={handleCloseSnackbar}
                    sx={{ width: '100%' }}>
                    <AlertTitle><strong>Success</strong></AlertTitle>
                    Answers successfully saved!
                </Alert>
            </Snackbar>
            <Dialog
                open={openSaveDialogue}
                onClose={handleCloseSaveDialogue}
                aria-labelledby="Save builder answers"
                aria-describedby="Save answers entered on builder screen to the database"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Save answers?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Confirm that you want to save your answers.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseSaveDialogue}>No</Button>
                    <Button onClick={saveDoc} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
            {/* END ==--> Dialogue saving answers to db  */}
            {/*  <---END ADD TO NAV BAR  */}

            <Container maxWidth>
                <Grid
                    container
                    direction="column"
                >
                    <Grid item xs={1}
                        sx={{ padding: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography variant="h4">
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
                                                        <Tippy
                                                            placement='top'
                                                            content={< span > {thisAnswer.answerText}</span >}
                                                            arrow={true}
                                                            arrowType='sharp'
                                                            maxWidth={800}
                                                            animation='shift-away'
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
                            <Button className='nav-buttons' variant="contained"
                                disabled={showBackButton}
                                onClick={(event) => { handleNextBackButtons(event, GO_BACK) }}
                                sx={{ mr: 2 }}>
                                Back
                            </Button>
                            <Button className='nav-buttons' variant="contained"
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