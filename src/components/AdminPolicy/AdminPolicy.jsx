import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';


// const useStyles = makeStyles({
//     dataGrid: {
//         background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
//         borderRadius: 3,
//         border: 0,
//         color: "white",

//         boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
//         width: "450px"
//     }
// });

const columns = [
    { field: 'id', headerName: 'Policy ID', width: 85 },
    { field: 'companyName', headerName: 'Company name', width: 200 },
    { field: 'firstName', headerName: 'First Name', width: 150 },
    { field: 'lastName', headerName: 'Last Name', width: 150 },
    { field: 'phone', headerName: 'Phone Number', width: 130 },
    { field: 'email', headerName: 'Email', width: 300 },
    {
        field: 'actions', headerName: 'Actions', width: 100, sortable: false,
        renderCell: () => (
            <strong>
                {/* <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ marginLeft: 5 }}
                >
                    View
                </Button> */}
                <IconButton>
                    <DownloadIcon />
                </IconButton>
                <IconButton>
                    <DeleteIcon />
                </IconButton>
            </strong>
        ),
    }
];

const rows = [
    {
        id: 1, companyName: 'Excel Energy', firstName: 'Jon', lastName: 'Alexander',
        phone: '612-999-2222', email: 'jennifer.alexander@email.com'
    },
    {
        id: 2, companyName: 'xFinity', firstName: 'Meredith', lastName: 'Wildberry',
        phone: '612-000-1111', email: 'meredith.wildberry@email.com'
    }
];


export default function AdminPolicy() {

    //const classes = useStyles();
    return (
        <Container>
            <Typography variant="h4" component="div" gutterBottom align="center">
                Manage Travel Policies
            </Typography>
            <div style={{ height: 500 }}>

                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />

            </div>
        </Container>
    );
}

