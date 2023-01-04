import React from "react";
import {Link} from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import "./Navbar.scss";
import LogoutIcon from '@mui/icons-material/Logout';

function Navbar() {

    const logout = () => {
      localStorage.removeItem("currentUser");
      localStorage.removeItem("tokenKey");
      localStorage.removeItem("userName");
      window.location.reload();

    };
    let userId = 1;
    return(
        <div>
    <AppBar position="static" style={{ background: '#264653' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography className="title" variant="h6" sx={{ flexGrow: 1 }}>
            <Link className="link" to="/">Home</Link>
          </Typography>

          <Typography variant="h6">
  {
    (localStorage.getItem("currentUser") == null || localStorage.getItem("currentUser") == "null") ?
      <Link className="link" to={{pathname : "/auth"}}>Login</Link> :
      <>
        <Link className="link2" to={{pathname : "/users/" + localStorage.getItem("currentUser")}}>Profile</Link>
        <LogoutIcon onClick={logout} style={{cursor :"pointer"}}></LogoutIcon>
      </>
  }
</Typography>
        </Toolbar>
    </AppBar>
        </div>
    )
}

export default Navbar;