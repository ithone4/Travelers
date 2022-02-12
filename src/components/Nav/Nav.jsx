import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import AnnouncementRoundedIcon from '@mui/icons-material/AnnouncementRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded';


function Nav() {
  const user = useSelector((store) => store.user);

  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  let iconArray=[
<HomeRoundedIcon></HomeRoundedIcon>,
    <InfoRoundedIcon></InfoRoundedIcon>,
     <HelpRoundedIcon></HelpRoundedIcon>,
    <AnnouncementRoundedIcon></AnnouncementRoundedIcon>,
  <ArticleRoundedIcon></ArticleRoundedIcon>,
  <ExitToAppRoundedIcon></ExitToAppRoundedIcon>
 ];

  const list = (anchor) => (

    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {[<Link className="navLink" to="/user">'Home'</Link>,
         <Link className="navLink" to="/info">
         Info Page
       </Link>,
        <Link className="navLink" to="/question">
        Question Page
      </Link>, 
         <Link className="navLink" to="/about">
         About
       </Link>,
          <Link className="navLink" to="/docgen">
          docgen
        </Link>,
           <LogOutButton className="navLink" />
          ].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
            <p>{iconArray[index]}</p>
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );


  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">Prime Solo Project</h2>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {user.id === null &&
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        }

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>


<div >
    </div>
    {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <div className='menuButton'><Button onClick={toggleDrawer(anchor, true)}><ViewListRoundedIcon></ViewListRoundedIcon></Button></div>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;
