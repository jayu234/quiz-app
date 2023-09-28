/*
 * This component renders single question.
*/

import React, { useEffect } from 'react'
import { Box, Button, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateAnswer } from '../store/answerSlice';
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';

function QuestionItem({ data, currQue, setCurrQue }) {
    const dispatch = useDispatch();
    const { data: answers } = useSelector((state) => state.answer);

    // Maintaining a state while user chooses an option
    const [selected, setSelected] = React.useState(""); 

    // `answer` state gets updated each time user chooses an option
    const handleChange = (event) => {
        const newSelected = event.target.value;
        setSelected(newSelected);
        dispatch(updateAnswer({ id: currQue, selected: newSelected, correct: data.correct_answer }));
    };

    useEffect(() => {
        setSelected(answers[currQue].selected);
    }, [currQue])
    return (
        <Box>

            {/* <---------- Navigation buttons ----------> */}
            <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "2rem" }}>
                <Button variant='contained' startIcon={<NavigateBeforeRoundedIcon color='#FFFFFF' />} disabled={currQue === 0} onClick={() => { setCurrQue((prev) => prev - 1) }} sx={{ textTransform: "none", color: "white" }}>Back</Button>
                <Button variant='contained' endIcon={<NavigateNextRoundedIcon color='#FFFFFF' />} disabled={currQue === 14} onClick={() => { setCurrQue((prev) => prev + 1) }} sx={{ textTransform: "none", color: "white" }}>Next</Button>
            </Box>
            
            {/* <---------- Question text ----------> */}
            {/* `dangerouslySetInnerHTML` prop is used to convert HTML entities into normal text */}
            <Typography gutterBottom variant="h6" component="p" dangerouslySetInnerHTML={{__html: `<p>${currQue+1}. ${data.question}</p>`}} sx={{fontSize: "18px", fontFamily: "inherit"}}/> 
            
            {/* <---------- Options ----------> */}
            <FormControl>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={selected}
                    onChange={handleChange}
                >
                    {data.incorrect_answers.concat(data.correct_answer).map((value, index) => {
                        return (
                            <FormControlLabel key={index} value={value} control={<Radio />} label={<span dangerouslySetInnerHTML={{ __html: value }}/>}/>
                        )
                    })}
                </RadioGroup>
            </FormControl>
        </Box>
    )
}

export default QuestionItem