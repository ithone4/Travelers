import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

function InfoSnippet(props) {

    return (
        <div>
            <Container maxWidth>
                <Box>
                    <Typography>
                        I'm the Info Snippet!
                    </Typography>
                </Box>
            </Container>
        </div>
    );
}

export default InfoSnippet;
