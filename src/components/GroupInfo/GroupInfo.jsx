import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';


function GroupInfo(props) {

    return (
        <div>
            <Container maxWidth>
                <Box>
                    <Typography variant="h4">
                        {props.groupName}
                    </Typography>
                </Box>
            </Container>
        </div>
    );
}

export default GroupInfo;
