import React from "react";
import { CardContent, InputAdornment, makeStyles } from "@mui/material";
import { red } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";



function Comment(props) {
  const { userId, userName, postId, refreshFunction } = props;
    const [text, setText] = React.useState("");

    const saveComment = () => {
        fetch("https://springboot-forum.herokuapp.com/api/comments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("tokenKey"),
        },
        body: JSON.stringify({
            postId: postId,
            text: text,
            userId: userId
        }),
        })
        .then((res) => res.json())
        .then((res) => {
            refreshFunction();
        })
        .catch((err) => console.log("error: "+err));
    }

    const submit=()=>{
        if(text.length < 1){
        alert("Please enter text");
        return;
        }
        saveComment();

        setText("");
    }
  

  return (
    <CardContent>
        <OutlinedInput
        id="outlined-adornment-amount"
        multiline
        placeholder="Enter a comment..."
        inputProps={{ maxLength: 25 }}
        fullWidth
        startAdornment={
            <InputAdornment position="start">
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    {userName.charAt(0).toUpperCase()}
                    
                </Avatar>
            </InputAdornment>
        }
        endAdornment={
            <InputAdornment position="end">
                <Button variant="contained" onClick={submit}>Comment</Button>
            </InputAdornment>
        }
        value={text}
        onChange={(e) => setText(e.target.value)}
        >

        </OutlinedInput>
    </CardContent>
  );
}

export default Comment;