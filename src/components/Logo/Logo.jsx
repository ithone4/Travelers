import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TravelersLogo from '../../images/TravelersLogo.png'; 

function Logo(props) {

    return (
        <div>
            <Container maxWidth>
                <Box>
                    <Typography>
                    <h6><img alt="logo" className="fersk-tech-policy-logo" src={TravelersLogo}/></h6>
                    </Typography>
                </Box>
            </Container>
        </div>
    );
}

export default Logo;
