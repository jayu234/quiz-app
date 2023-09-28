/*
 * This componet is used for rendering details of the previous quiz.
 * User can view question, selected answer, incorrect answer, and correct answer of a previous quiz.
 * 
*/

import React, { useEffect, useState } from 'react'
import { Box, Grid, IconButton, Typography } from '@mui/material'
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import ReportItem from './ReportItem';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

function PastQuizDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data } = useSelector((state) => state.user.quizHistory);
    const [quizDetails, setQuizDetails] = useState({});
    const [marks, setMarks] = useState(0);
    useEffect(() => {
        let score = 0;
        for (let i = 0; i < data.length; i++) {
            if (data[i].selected === data[i].correct) score++;
        }
        setMarks(score);
    }, [])
    useEffect(() => {
        let details = {};
        for (let i = 0; i < data.length; i++) {
            if(data[i]._id===id){
                details = {...data[i], index: i}
            }
        }
        setQuizDetails(details);
    }, [id])
    return (
        <Grid sx={{ paddingX: "2rem", paddingY: "1rem" }} flexDirection={"column"} justifyContent={"space-between"}>

            {/* <---------- Back button ---------->*/}
            <Grid item>
                <IconButton onClick={() => { navigate("/quiz-history") }} sx={{ color: "white" }}><ArrowBackRoundedIcon /></IconButton>
            </Grid>

            {/* <---------- Heading ----------> */}
            <Grid item>
                <Typography variant='h4' align='center' fontFamily={"inherit"}>Quiz - {quizDetails?.index + 1}</Typography>
                <Typography variant='h6' align='center' fontFamily={"inherit"} mb={2}>You&#039;ve scored {marks} out of 15!!</Typography>
            </Grid>

            {/* <---------- Question, 4 Options, Correct & Incorrect Answer */}
            <Grid item>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem", justifyContent: "flex-start", alignItems: "flex-start" }}>
                    {quizDetails?.answers?.map((item, idx) => {
                        return (<ReportItem key={idx} questionData={item} answerData={item} id={idx + 1} />
                        )
                    })}
                </Box>
            </Grid>
        </Grid>
    )
}

export default PastQuizDetails