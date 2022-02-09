import React from 'react';
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
                            <GroupInfo />
                        </Box>
                    </Grid>
                    <Grid item xs={4}
                        sx={{ border: 1 }}>
                        <InfoSnippet />
                    </Grid>
                    <Grid item xs={12}
                        sx={{ border: 1 }}>
                        <QuestionPage />
                    </Grid>
                </Grid>
            </Container>
        </div >
    );
}

export default Builder;
