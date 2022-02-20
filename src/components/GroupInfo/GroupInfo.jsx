import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import './GroupInfo.css';


function GroupInfo(props) {

    return (
        <div>
            <Container maxWidth='xl'>
                <Box>
                    <h3 className='group-text'>
                        Topic: {props.groupName}
                    </h3>
                </Box>
            </Container>
        </div>
    );
}

export default GroupInfo;
