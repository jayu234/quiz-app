/**
 * This component is used for rendering the Report after user submits a quiz
 */

import React, { useEffect, useState } from 'react'
import { Box, Button, Grid, Typography } from '@mui/material'
import ReportItem from './ReportItem';

import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { resetState } from '../store/answerSlice';
import { saveQuizData } from '../store/userSlice';

function Report() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { data: questions } = useSelector((state) => state.question);
    const { data: answers } = useSelector((state) => state.answer);
    const { _id: userId } = useSelector((state) => state.user.userData.data);
    const [marks, setMarks] = useState(0);

    // For calulating the score.
    useEffect(() => {
        let score = 0;
        for (let i = 0; i < answers.length; i++) {
            if (answers[i].selected === questions[i].correct_answer) score++;
        }
        setMarks(score);
    }, [])

    // To handle restart. 
    const handleRestart = () => {
        const userAnswers = questions.map((item, idx) => { return { question: item.question, selected: answers[idx].selected, correct_answer: item.correct_answer, incorrect_answers: item.incorrect_answers } })
        dispatch(saveQuizData({user: {_id: userId}, answers: userAnswers}));
        dispatch(resetState());
        navigate("/");
    }
    return (
        <Grid sx={{ paddingX: "2rem", paddingY: "1rem" }} flexDirection={"column"} justifyContent={"space-between"}>

            <Grid item>
                <Typography variant='h4' align='center' fontFamily={"inherit"}>Result</Typography>
                <Typography variant='h6' align='center' fontFamily={"inherit"} mb={2}>You&#039;ve scored {marks} out of 15!!</Typography>
            </Grid>

            {/* < ----------  Questions with Options, Selected answer, Correct answer, and Incorrect answer  ----------> */}
            <Grid item>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem", justifyContent: "flex-start", alignItems: "flex-start" }}>
                    {questions.map((item, idx) => {
                        return (<ReportItem key={idx} questionData={item} answerData={answers[idx]} id={idx + 1} />
                        )
                    })}
                </Box>
            </Grid>

            {/* <----------  Restart button  ----------> */}
            <Grid item sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                    sx={{
                        width: "30%",
                        marginX: "auto",
                        textTransform: "none",
                        background: "#1e88e5",
                        color: "#fff",
                        marginTop: "1rem",
                        fontSize: "18px",
                        fontFamily: "inherit",
                        ":hover": { backgroundColor: "#1976d2" }
                    }}
                    onClick={handleRestart}
                >Start new quiz</Button>
            </Grid>
        </Grid>
    )
}

export default Report