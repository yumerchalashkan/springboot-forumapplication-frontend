import React from "react";
import { useParams } from "react-router-dom";
import {Avatar} from '@mui/material';
import { red } from '@mui/material/colors';
import Avatar1 from "../Avatar/Avatar1";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

function User(){
    const navigate = useNavigate();

    

    useEffect(() => {
        if(localStorage.getItem("currentUser") == null || localStorage.getItem("currentUser") == "null" || localStorage.getItem("currentUser") == "undefined" || localStorage.getItem("currentUser") == undefined){
            navigate('/');
          }
    },[]);

    const {userId} = useParams();
    
    return(
        <div>

          <Avatar1 datas ={userId}></Avatar1>
        </div>
    )
}

export default User;