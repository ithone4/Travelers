import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import './InfoSnippet.css';

function InfoSnippet(props) {

    return (
        <div>
            {/* <Container> */}
            <Box className="module line-clamp-snippet">

                {/* <Typography variant="caption"> */}
                {props.infoSnippetText}
                {/* </Typography> */}
            </Box>
            {/* </Container> */}
        </div>
    );
}

export default InfoSnippet;
