import React, {useState, useEffect} from "react";
import  ReactDOM from "react-dom";
import "./Post.scss";
import { Card, CardHeader, Avatar, IconButton, CardMedia, CardContent, Typography, CardActions, Collapse, InputAdornment, Button } from '@mui/material';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import {Link} from "react-router-dom";
import OutlinedInput from '@mui/material/OutlinedInput';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';


import AddCommentIcon from '@mui/icons-material/AddComment';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function FormPost(props){
    const {userName, userId, refresh} = props;

const [text, setText] = useState("");
const [title, setTitle] = useState("");
const [isSent, setIsSent] = React.useState(false);
const [open, setOpen] = React.useState(false);

  const savePost = () => {
    fetch("http://localhost:8080/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("tokenKey"),
      },
      body: JSON.stringify({
        title: title,
        text: text,
        userId: userId
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        refresh();
    })
      .catch((err) => console.log("error: "+err));
  }
  

  const submit=()=>{
    if(text.length < 1 || title.length < 1){
      alert("Please enter text and title");
      return;
    }
    savePost();
    setIsSent(true);
    setText("");
    setTitle("");
    refresh();
  }


  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsSent(false);
  };

    return(
        <div className="postContainer">
          <Snackbar open={isSent} autoHideDuration={1000} onClose={handleClose}>
  <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
    This is a success message!
  </Alert>
</Snackbar>

<Card className="root" style={{background: '#e1e5f2'}}>
      <CardHeader
        avatar={
            <Link className="link" to={{pathname : "/users/" + userId}}>
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {userName.charAt(0).toUpperCase()}
          </Avatar>
          </Link>
        }
        
        title={<OutlinedInput id="outlined-adornment-amount" placeholder="enter title" inputProps={{maxLength: 65}} fullWidth style={{height: '35px'}}
        onChange={(e)=>setTitle(e.target.value)} value={title}
        >

        </OutlinedInput>}
        
      />
      <CardContent>
  <div style={{ overflow: "auto" }}>
    <Typography variant="body2" color="text.secondary">
      <OutlinedInput value={text} id="outlined-adornment-amount" onChange={(e) => setText(e.target.value)} multiline placeholder="enter text" inputProps={{ maxLength: 3250 }} fullWidth
        endAdornment={
          <InputAdornment position="end">
            <Button variant="contained" onClick={submit}>Enter</Button>
          </InputAdornment>}
      >
      </OutlinedInput>
    </Typography>
  </div>
</CardContent>
      
    </Card>


            
            
        </div>
    )
    
}

export default FormPost;
