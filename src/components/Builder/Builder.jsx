import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import GroupInfo from '../GroupInfo/GroupInfo';
import InfoSnippet from '../InfoSnippet/InfoSnippet';
import Typography from '@mui/material/Typography';
import QuestionPage from '../QuestionPage/QuestionPage';
import Logo from '../Logo/Logo';

function Builder() {
    const params = useParams();
    const dispatch = useDispatch();
    const user = useSelector(store => store.user);
    const [questionId, setQuestionId] = useState(1);
    const [groupName, setGroupName] = useState('');
    const [infoSnippetText, setInfoSnippetText] = useState('');
    const companyPolicy = useSelector(store => store.policyBuilderReducer.policyBuilderReducer);
    const companyCulture = useSelector(store => store.policyBuilderReducer.companyCultureReducer);

    useEffect(() => {
        console.log(`in useEffect of Builder`)
        // dispatch({ type: 'FETCH_BUILDER', payload: params.userId });
        // dispatch({ type: 'FETCH_COMPANY_CULTURE', payload: params.userId });
        console.log(`company policy is:`, companyPolicy);
        console.log(`company culture is:`, companyCulture);
    }, []);


    return (
        <div>
            <Container maxWidth>
                <Grid
                    container
                    direction="rows"
                    sx={{ border: 1 }}
                >
                    <Grid item xs={3}
                        sx={{ border: 1 }}>
                        <Logo />
                    </Grid>
                    <Grid item xs={5}
                        sx={{ border: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <GroupInfo questionId={questionId}
                                groupName={groupName} />
                        </Box>
                    </Grid>
                    <Grid item xs={4}
                        sx={{ border: 1 }}>
                        <InfoSnippet questionId={questionId}
                            infoSnippetText={infoSnippetText} />
                    </Grid>
                    <Grid item xs={12}
                        sx={{ border: 1 }}>
                        <QuestionPage
                            updateQuestionId={questionId => setQuestionId(questionId)}
                            updateGroupName={groupName => setGroupName(groupName)}
                            updateInfoSnippet={infoSnippetText => setInfoSnippetText(infoSnippetText)}
                            companyPolicy={companyPolicy}
                            companyCulture={companyCulture} />
                    </Grid>
                </Grid>
            </Container>
        </div >
    );
}

export default Builder;
