import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import GroupInfo from '../GroupInfo/GroupInfo';
import InfoSnippet from '../InfoSnippet/InfoSnippet';
import Typography from '@mui/material/Typography';
import InfoIcon from '@mui/icons-material/Info';
import QuestionPage from '../QuestionPage/QuestionPage';
import QuestionCount from '../QuestionCount/QuestionCount';
import Logo from '../Logo/Logo';
import './Builder.css';

function Builder() {
    const params = useParams();
    const dispatch = useDispatch();
    const user = useSelector(store => store.user);
    const [questionId, setQuestionId] = useState(1);
    const [groupName, setGroupName] = useState('');
    const [totalQuestionCount, setTotalQuestionCount] = useState();
    const [infoSnippetText, setInfoSnippetText] = useState('');
    const companyPolicy = useSelector(store => store.policyBuilderReducer.policyBuilderReducer);
    const companyCulture = useSelector(store => store.policyBuilderReducer.companyCultureReducer);

    useEffect(() => {
        setQuestionId(params.id); //for 1st load of info
    }, []);


    return (
        <div>
            <Container maxWidth>
                <Grid
                    container
                    direction="rows"
                >
                    <Grid container>
                        <Grid item xs={12}
                            sx={{ mr: 4, mt: -2 }}>
                            <QuestionCount
                                questionId={questionId}
                                totalQuestionCount={totalQuestionCount}
                            />
                        </Grid>
                        {/* <Grid item xs={3}>

                        </Grid> */}
                        <Grid container xs={6.5} sx={{
                            justifyContent: 'left'
                        }}>
                            <Box sx={{ display: 'flex', ml: 3, pt: 3 }}>
                                <GroupInfo questionId={questionId}
                                    groupName={groupName} />
                            </Box>
                        </Grid>
                        <Grid item xs={0.5} sx={{ display: 'flex', justifyContent: 'center', pt: 1 }}>
                            <InfoIcon />
                        </Grid>
                        <Grid item xs={5} sx={{ minHeight: '150px', pr: 5 }}>
                            <InfoSnippet questionId={questionId}
                                infoSnippetText={infoSnippetText} />
                        </Grid>
                    </Grid>
                    {/* <Grid item xs={12}>
                        <Divider flexItem />
                    </Grid> */}

                    <Grid item xs={12}>
                        <Paper elevation={20} sx={{ mb: 10, ml: 5, mr: 5 }}>
                            <QuestionPage
                                updateQuestionId={questionId => setQuestionId(questionId)}
                                updateGroupName={groupName => setGroupName(groupName)}
                                updateInfoSnippet={infoSnippetText => setInfoSnippetText(infoSnippetText)}
                                setTotalQuestionCount={totalQuestionCount => setTotalQuestionCount(totalQuestionCount)}
                                companyPolicy={companyPolicy}
                                companyCulture={companyCulture} />
                        </Paper>
                    </Grid>

                </Grid>
            </Container>
        </div >
    );
}

export default Builder;
