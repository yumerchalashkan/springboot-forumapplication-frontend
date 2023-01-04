import React from "react";
import { CardContent, InputAdornment, makeStyles } from "@mui/material";
import { red } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import OutlinedInput from "@mui/material/OutlinedInput";
import "./Comment.scss";




function Comment(props) {
  const { userId, text, userName } = props;
  

  return (
    <CardContent>
        <OutlinedInput
        style={{color: 'black',fontWeight: 'bold'}}
        disabled
        
        id="outlined-adornment-amount"
        multiline
        placeholder="text"
        inputProps={{ maxLength: 25 }}
        fullWidth
        value={text}
        startAdornment={
            <InputAdornment position="start">
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    {userName.charAt(0).toUpperCase()}
                    
                </Avatar>
            </InputAdornment>
        }
        >

        </OutlinedInput>
    </CardContent>
  );
}

export default Comment;