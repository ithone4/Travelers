import React from 'react';
import { Link, useParams } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded';
import Toolbar from '@mui/material/Toolbar';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FerskTechTextPlusLogo from '../../images/FerskTechTextPlusLogo.png';
import Utility from '../../utility';
import { useState, useEffect } from 'react';



function Nav() {
  const user = useSelector((store) => store.user);
  const companyPolicy = useSelector(store => store.policyBuilderReducer.policyBuilderReducer);
  const companyCulture = useSelector(store => store.policyBuilderReducer.companyCultureReducer);
  const answersFromTempStore = useSelector(store => store.policyBuilderReducer.tempPolicyReducer);
  const questionReducer = useSelector((store) => store.questionReducer);
  const groupReducer = useSelector((store) => store.groupReducer);
  const saveButton = useSelector(store => store.showSaveReducer);
  const currentQuestionID = useSelector(store => store.policyBuilderReducer.currentQuestionID);
  const dispatch = useDispatch();
  const params = useParams();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  //setting the document data for generator
  //this utilizes these items from the store: groupReducer, policyBuilderReducer.policyBuilderReducer, questionReducer
  //then stores it in the documentReducer
  //change policy_text_ to answer_ if you want to generate answer text for testing.
  const setDocument = () => {



    const regex = /<xxx>/i;
    let array = [];
    groupReducer.forEach(el => {
      array.push({
        group_id: el.id,
        header: el.group_name,
        Paragraphs: []
      })
    });

    for (let i = 0; i < questionReducer.length; i++) {
      if (companyPolicy[0][`question_${i + 1}`] != null && !(companyPolicy[0][`question_${i + 1}`] > 6)) {
        array[questionReducer[i].group_id - 1].Paragraphs.push(questionReducer[i][`answer_${companyPolicy[0][`question_${i + 1}`]}`].replace(regex, user.company_name));
      }//end if
    } // end for
    //filters out unused sections
    let newArray = array.filter((el) => {
      if (el.Paragraphs.length > 0) { return true }
      else { return false }
    })
    dispatch({ type: "SET_DOCUMENT", payload: newArray })

    handleCloseNavMenu();
    return newArray;
  } //end set document data

  const save = () => {
    console.log(`in save and answersFromTempStore are:`, answersFromTempStore);
    let policyArray = Utility.formatPolicyAnswersForDatabase(answersFromTempStore);
    console.log(`in save of UserPage and policyArray is:`, policyArray);
    if (policyArray.answers.length != 0) {
      try {
        dispatch({ type: 'SAVE_BUILDER_TO_DB', payload: policyArray });
      } catch (error) {
        console.log(`error saving policy answers to database`);
      }
      handleCloseNavMenu();
      
      dispatch({type: 'UPDATE_LAST_QUESTION', payload: {last_question: currentQuestionID, id: user.id}})
    }
  }
  if (user.id > 0) {


    return (
      <div className="nav">
        <Link to="/home">
          <h6><img alt="logo" className="fersk-tech-policy-logo" src={FerskTechTextPlusLogo} /></h6>
        </Link>
        <div>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Box sx={{ flexGrow: 1, display: 'flex', fontSize: '100' }}>
                <div className='menu'>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}

                  >
                    <ViewListRoundedIcon />
                  </IconButton>
                </div>
                {saveButton ?
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: 'block',
                    }}
                  >

                    <Link className="navLink" to="/home">
                      <MenuItem onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">Home</Typography>
                      </MenuItem>
                    </Link>
                    <Link className="navLink" to="/info">
                      <MenuItem onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">Info</Typography>
                      </MenuItem>
                    </Link>
                    <Link className="navLink" to={`/question/${user.last_question}`}>
                      <MenuItem onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">Go to Builder</Typography>
                      </MenuItem>
                    </Link>
                    <Link className="navLink" to="/about">
                      <MenuItem onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">About</Typography>
                      </MenuItem>
                    </Link>
                    <Link className="navLink" to="/docgen">
                      <MenuItem onClick={setDocument}>
                        <Typography textAlign="center">DocGen</Typography>
                      </MenuItem>
                    </Link>
                    <Link className="navLink" to="/home">
                      <MenuItem onClick={save}>
                        <Typography textAlign="center">Save and Exit</Typography>
                      </MenuItem>
                    </Link>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Link to="/login"><LogOutButton className="navLink" /></Link>
                    </MenuItem>
                  </Menu>
                  :
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: 'block',
                    }}
                  >

                    <Link className="navLink" to="/home">
                      <MenuItem onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">Home</Typography>
                      </MenuItem>
                    </Link>
                    <Link className="navLink" to="/info">
                      <MenuItem onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">Info</Typography>
                      </MenuItem>
                    </Link>
                    <Link className="navLink" to={`/question/${user.id}`}>
                      <MenuItem onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">Go to Builder</Typography>
                      </MenuItem>
                    </Link>
                    <Link className="navLink" to="/about">
                      <MenuItem onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">About</Typography>
                      </MenuItem>
                    </Link>
                    <Link className="navLink" to="/docgen">
                      <MenuItem onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">DocGen</Typography>
                      </MenuItem>
                    </Link>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Link to="/login"><LogOutButton className="navLink" /></Link>
                    </MenuItem>
                  </Menu>}


              </Box>
            </Toolbar>
          </Container>
        </div>
      </div>
    );
  }
  else {
    return (<div className="nav">
      <Link to="/home">
        <h6><img alt="logo" className="fersk-tech-policy-logo" src={FerskTechTextPlusLogo} /></h6>
      </Link>
      <div>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: 'flex' }}>
              <div className='menu'>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}

                >
                  <ViewListRoundedIcon />
                </IconButton>
              </div>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: 'block',
                }}
              >
                <Link className="navLink" to="/home">
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Home</Typography>
                  </MenuItem>
                </Link>
                <Link className="navLink" to="/login">
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Login</Typography>
                  </MenuItem>
                </Link>
                <Link className="navLink" to="/about">
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">About</Typography>
                  </MenuItem>
                </Link>
              </Menu>

            </Box>
          </Toolbar>
        </Container>
      </div>
    </div>)
  }
}

export default Nav;