import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import path from "./avatar.jpg";

function Avatar1(props){
  const {datas} = props;

    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop : 82 }}>
        <Card sx={{ maxWidth: 345, textAlign : "center" }}>
          <CardMedia
            sx={{ height: 200 }}
            image={path}
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {localStorage.getItem("userName")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
            Software Engineer | Back-end Developer | Java | Spring Framework | Spring Boot
            </Typography>
          </CardContent>
        </Card>
        </div>
      );
}

export default Avatar1;