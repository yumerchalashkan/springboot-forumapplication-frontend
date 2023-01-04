import { ClassNames } from "@emotion/react";
import { Class } from "@mui/icons-material";
import { Container } from "@mui/material";
import React, {useState, useEffect} from "react";
import FormPost from "../Post/FormPost";
import Post from "../Post/Post";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


import "./Home.scss";



function Home() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postList, setPostList] = useState([]);

    const refresh = () => {
        fetch("http://localhost:8080/api/posts")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setPostList(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    };

    useEffect(() => {
        refresh();
        
    }, []);

    if (error) {
        return <div style={{display: "flex", justifyContent: "center", marginTop: 75}}><Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        This is an error — <strong>check it out!</strong>
      </Alert></div>;
    }else if (!isLoaded) {
        return <div style={{display: "flex", justifyContent: "center", marginTop: 75}}>
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress size={95} />
                </Box>
            </div>;
    }else{
        return(

        
            <Container fixed className="containerstyle">
                {(localStorage.getItem("currentUser") == null || localStorage.getItem("currentUser") =="null") ? "" : <FormPost userId={localStorage.getItem("currentUser")} userName={localStorage.getItem("userName")} refresh={refresh}></FormPost>}
                
                {postList.map(post => (
                    <Post likes={post.postLikes} postId={post.id} userId={post.userId} userName={post.userName} title={post.title} text={post.text}></Post>
                ))}
            </Container>
       
            
        )
    }





}

export default Home;