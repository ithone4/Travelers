import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import GroupInfo from '../GroupInfo/GroupInfo';
import InfoSnippet from '../InfoSnippet/InfoSnippet';
import Typography from '@mui/material/Typography';
import QuestionPage from '../QuestionPage/QuestionPage';

function Builder() {

    return (
        <div>
            <Container maxWidth>
                <Grid
                    container
                    direction="rows"
                    sx={{ border: 1 }}
                // justifyContent="left"
                // alignItems="left"
                >
                    <Grid item xs={3}
                        sx={{ border: 1 }}
                    >
                        <Typography>I'll be the logo soon</Typography>
                    </Grid>
                    <Grid item xs={6}
                        sx={{ border: 1 }}>
                        <GroupInfo />
                    </Grid>
                    <Grid item xs={3}
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
