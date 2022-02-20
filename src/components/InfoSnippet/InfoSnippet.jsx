import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';
import './InfoSnippet.css';

function InfoSnippet(props) {

    return (
        <div>
            {/* <Container> */}
            <Box className="module-snippet line-clamp-snippet">
                <Tippy
                    placement='top'
                    content={< span > {props.infoSnippetText}</span >}
                    arrow={true}
                    // arrowType='sharp'
                    maxWidth={800}
                    animation='shift-away'
                    trigger='click'
                >
                    <p className="snippet-text">{props.infoSnippetText}</p>
                </Tippy >

                {/* <Typography className='snippet-text' variant="caption">
                    {props.infoSnippetText}
                </Typography> */}
            </Box>
            {/* </Container> */}
        </div>
    );
}

export default InfoSnippet;
