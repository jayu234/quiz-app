/**
 * 
 * This component renders the Next&Back navigation button, Quiz data, Navigation Panel.
 * Using Navigation Panel user can see which questions have been visited and which questions has been attempted.
 *  
 */

import { Box, Button, CircularProgress, Container, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom"
import QuestionItem from './QuestionItem';
import { getQuestions } from '../store/questionSlice';

function Quiz() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [currQue, setCurrQue] = useState(0); // `currQue` represents the current question being rendered 

    const [visitedQuestions, setVisitedQuestions] = useState(Array(15).fill(false)); // State for managing `Visited Question`
    const [attemptedQuestions, setAttemptedQuestions] = useState(Array(15).fill(false)); // State for managing `Attempted Question`

    const { data, isLoading } = useSelector((state) => state.question);
    const { data: answers } = useSelector((state) => state.answer);

    const [timer, setTimer] = useState(30*60); // Timer

    // For timer
    useEffect(() => {

        // When timer reaches to 0, quiz will be submitted and user will be navigated to "/report" page.
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else {
            navigate("/report")
        }
    }, [timer]);

    useEffect(() => {
        dispatch(getQuestions());
    }, [dispatch]);

    // For managing 'Visited Questions' & 'Attempted Questions'
    useEffect(() => {
        if (data[currQue]) {

            const newVisitedQuestions = [...visitedQuestions];
            const newAttemptedQuestions = [...attemptedQuestions];

            newVisitedQuestions[currQue] = true; 

            if (answers[currQue].selected && answers[currQue].selected.length > 0) {
                newAttemptedQuestions[currQue] = true;
            }

            setVisitedQuestions(newVisitedQuestions);
            setAttemptedQuestions(newAttemptedQuestions);
        }
    }, [data, currQue, answers]);
    return (
        <Grid container sx={{ paddingX: "2rem", paddingY: "1rem" }} flexDirection={"column"} justifyContent={"space-between"}>
            {/* Timer */}
            <Grid item justifyContent={"flex-end"} mb={4}>
                <Typography align="right" fontFamily={"inherit"} fontWeight={600} fontSize={"26px"}>{Math.floor(timer / 60)}:{timer % 60}</Typography>
            </Grid>
            {/* <----------  Question component  ---------->*/}
            <Grid item mb={4}>
                {isLoading ?
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <CircularProgress />
                    </Box>
                    :
                    <QuestionItem data={data[currQue]} currQue={currQue} setCurrQue={setCurrQue} />}
                {currQue === 14 &&
                    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <Button
                            variant={"outlined"}
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
                            onClick={() => { navigate("/report") }}
                        >
                            Submit
                        </Button>
                    </Box>}
            </Grid>
            {/* <----------  Navigation Panel  ---------->*/}
            <Grid item>
                <Grid container gap={2}>
                    {Array(15).fill().map((_, idx) => 1 + idx).map((item) => {
                        return (
                            <Grid key={item} item>
                                <Button
                                    variant='outlined'
                                    onClick={() => setCurrQue(item - 1)}
                                    sx={{
                                        textTransform: "none",
                                        color: "white",
                                        backgroundColor: visitedQuestions[item - 1] ? (attemptedQuestions[item - 1] ? "#4caf50" : "#ff9800") : "transparent"
                                    }}
                                >
                                    {item}
                                </Button>
                            </Grid>
                        )
                    })}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Quiz