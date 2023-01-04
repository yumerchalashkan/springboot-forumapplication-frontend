import React, {useState, useEffect} from "react";
import  ReactDOM from "react-dom";
import "./Post.scss";
import { Card, CardHeader, Avatar, IconButton, CardMedia, CardContent, Typography, CardActions, Collapse } from '@mui/material';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import {Link} from "react-router-dom";
import Comment from "../Comment/Comment";
import CommentForm from "../Comment/CommentForm";

import AddCommentIcon from '@mui/icons-material/AddComment';



const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));



function Post(props){
    const {title, text, userName, userId, postId, likes} = props;


    const [expanded, setExpanded] = React.useState(false);
    const [like, setLike] = React.useState(false);
    const [commentList, setCommentList] = useState([]);
    const isInitialMount = React.useRef(true);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const  [postList, setPostList] = useState([]);
    const [isLiked, setIsLiked] = useState(false);
    const count = likes.length;
    const [likeCount, setLikeCount] = useState(likes.length);
    const [likeId, setLikeId] = useState(null);


    const [temp, setTemp] = useState([]);


    
    

  const handleExpandClick = () => {
    setExpanded(!expanded);
    refreshComment();
    console.log(postList);
  };

  const likeFunction = () => {
    setLike(!like);
    if(!like){
      saveLike();
      setLikeCount(likeCount + 1);
    }else{
      deleteLike();
      setLikeCount(likeCount - 1);
    }
  }

  const checklikes = () => {
    var likesTemp = likes.find((likes => ""+likes.userId === localStorage.getItem('currentUser')));
    if(likesTemp != null){
      setLikeId(likesTemp.id);
      setLike(true);
    }
  }




  const refreshComment = () => {
    fetch("http://localhost:8080/api/comments?postId=" + postId)
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true);
                setCommentList(result);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
};

const saveLike = async () => {
  try {
    const res = await fetch("http://localhost:8080/api/like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("tokenKey"),
      },
      body: JSON.stringify({
        userId: localStorage.getItem("currentUser"),
        postId: postId,
      }),
    });
    const json = await res.json();
    console.log(json);
  } catch (error) {
    console.error(error);
  }
}

const deleteLike = async () => {
  try {
    await fetch("http://localhost:8080/api/like/" + likeId, {
      method: "DELETE",
      headers: {
        
        "Authorization": localStorage.getItem("tokenKey"),
      },
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    }else {
    refreshComment();
    }
}, []);


useEffect(() => {checklikes()}, []);



    return(
        <div className="postContainer">

<Card className="root" style={{background: '#e1e5f2'}}>
      <CardHeader
        avatar={
            <Link className="link" to={{pathname : "/users/" + userId}}>
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {userName.charAt(0).toUpperCase()}
          </Avatar>
          </Link>
        }
        
        title={title}
        
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        {text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>

      {(localStorage.getItem("currentUser") == null || localStorage.getItem("currentUser") =="null") ?
        <IconButton disabled aria-label="add to favorites" onClick={likeFunction}>
          <FavoriteIcon style={like? {color: "red"} : null} />
        </IconButton>

        :

        <IconButton aria-label="add to favorites" onClick={likeFunction}>
          <FavoriteIcon style={like? {color: "red"} : null} />
        </IconButton>}
        {likeCount}
        
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <AddCommentIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
        {error? "error" :
                    isLoaded? commentList.map(comment => (
                      <Comment userId = {1} userName = {"User"} text = {comment.text}></Comment>
                    )) : "Loading"}

{(localStorage.getItem("currentUser") == null || localStorage.getItem("currentUser") =="null") ? "" : <CommentForm refreshFunction={refreshComment} userId = {1} userName = {"User"} postId = {postId}></CommentForm>}
                    
        </CardContent>
      </Collapse>
    </Card>


            
            
        </div>
    )
    
}

export default Post;
