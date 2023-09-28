/**
 * 
 * This compnent renders list of previous quizzes of the user.
 *  
 */

import React, { useEffect } from 'react'
import { Button, Card, CardActions, CardContent, Grid, IconButton, Typography } from '@mui/material'
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { getAllQuiz } from '../store/userSlice';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

function QuizHistory() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { _id: userId } = useSelector((state) => state.user.userData.data);
  const { data } = useSelector((state) => state.user.quizHistory);

  useEffect(() => {
    dispatch(getAllQuiz(userId));
  }, [])
  return (
    <Grid container sx={{ minWidth: "650px", paddingX: "2rem", paddingY: "1rem" }} flexDirection={"column"} justifyContent={"space-between"}>

      {/* <----------  Back Arrow  ----------> */}
      <Grid item xs={8}>
        <IconButton onClick={() => { navigate("/") }} sx={{ color: "white", marginBottom: "1rem" }}><ArrowBackRoundedIcon /></IconButton>
      </Grid>

      {/* <----------  Heading  ----------> */}
      <Grid item xs={8}>
        <Typography variant='h4' align='left' fontFamily={"inherit"} mb={4}>History</Typography>
      </Grid>

      {/* <----------  List of the previous quizzes  ----------> */}
      <Grid item xs={8} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {data.map((item, idx) => {
          const date = new Date(item.createdAt);
          const options = {
            weekday: 'short',
            day: 'numeric',
            month: 'long',
          };
          const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
          return (
            <Card key={idx} sx={{ border: "1px solid grey", maxWidth: "100%", backgroundColor: "transparent", boxShadow: "none", display: "flex", alignItems: "center", justifyContent: "space-between", paddingX: "0.75rem" }}>
              <CardContent>
                <Typography gutterBottom variant="h6" component="div" color="white" fontFamily={"inherit"}>
                  Quiz - {idx + 1}
                </Typography>
                <Typography variant="body2" color={"white"} fontFamily={"inherit"}>
                  {formattedDate}
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant='contained' size="small" sx={{ textTransform: "none" }} onClick={() => { navigate(`/quiz/${item._id}`) }}>View</Button>
              </CardActions>
            </Card>
          )
        })}
      </Grid>
    </Grid>
  )
}

export default QuizHistory