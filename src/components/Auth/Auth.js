import { FormControl, InputLabel, Input, Button, FormHelperText } from '@mui/material';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import React from 'react';
import { useNavigate } from 'react-router-dom';



function Auth(){

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  const functionUsername = (username) => {
    setUsername(username);
  }
  const functionPassword = (password) => {
    setPassword(password);
  }

//http://localhost:8080/api/auth/
const sendRequest = async (type) => {
  try {
    const response = await fetch("https://springboot-forum.herokuapp.com/api/auth/"+type, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName : username,
        password : password
      }),
    });
    const result = await response.json();
    //console.log(result);

    if (result.message === "User already exists") {
      alert("User already exists");
      window.location.reload();
    }

    localStorage.setItem('tokenKey', result.message); 
    localStorage.setItem('currentUser', result.userId);
    localStorage.setItem('userName', username);
  } catch (err) {
    alert("Username or password is incorrect");
  }
}

const functionRegister = async () => {
  await sendRequest("register");
  setUsername('');
  setPassword('');
  window.location.reload();
  navigate('/auth');
  
}

const functionLogin = async () => {
  await sendRequest("login");
  setUsername('');
  setPassword('');
  window.location.reload();
}

  return (
    <div style={{display: "flex", justifyContent: "center", marginTop: 15}}>
    <FormControl>
            <InputLabel>Username</InputLabel>
            <Input  onChange = {(i) => functionUsername(i.target.value)}/>
            <InputLabel  style={{top: 80}}>Password</InputLabel>
            <Input style={{top: 40}}
            onChange = {(i) => functionPassword(i.target.value)}/>
            <Button variant = "contained"
                style = {{marginTop : 60,
                background :'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                color : 'white'}}
                onClick= {() => functionRegister("register")}>Register</Button>
            <FormHelperText style={{margin:20}}>Are you already registered?</FormHelperText>
            <Button variant = "contained"
                style = {{
                background :'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                color : 'white'}}
                onClick={() => functionLogin("login")}>Login</Button>
            <Stack sx={{ width: '100%', marginTop: "40px" }} spacing={2}>
          <Alert severity="info"><i>Sample Users:</i><br></br>
                  Username: <strong>admin</strong> Password: <strong>admin</strong><br></br>
                  Username: <strong>demo</strong> Password: <strong>demo</strong><br></br>
          </Alert>
        </Stack>
        </FormControl>
        
    </div>
  );
}

export default Auth;