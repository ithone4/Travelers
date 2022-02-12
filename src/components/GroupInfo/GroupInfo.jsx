import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';


function GroupInfo(props) {

    return (
        <div>
            <h3>{JSON.stringify(props)}</h3>
            <Container maxWidth>
                <Box>
                    <Typography>
                        I'm the Group Info page!
                    </Typography>
                </Box>
            </Container>
        </div>
    );
}

export default GroupInfo;
