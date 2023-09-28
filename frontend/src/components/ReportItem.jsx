/**
 * 
 * This component renders a single question in Report.
 * 
 */

import React from 'react'
import { Box, FormControl, FormControlLabel, Radio, Typography, RadioGroup } from '@mui/material';

function ReportItem({ id, questionData, answerData }) {
    return (
        <Box>
            <Box sx={{display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
            
            {/* <----------  Question text  ----------> */}
            <Typography gutterBottom variant="h6" component="p" dangerouslySetInnerHTML={{ __html: `<p>${id}. ${questionData.question}</p>` }} sx={{ fontSize: "18px", fontFamily: "inherit" }} />

            {/* "Not attempted" flag */}
            {!answerData.selected && <Typography gutterBottom variant="h6" component="p"  sx={{ fontSize: "18px", fontFamily: "inherit",color: "#ec9e9e" }} >*Not attempted</Typography>}
            </Box>

            {/* <----------  Options  ----------> */}
            <FormControl>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    defaultValue={answerData.selected}
                >
                    {questionData.incorrect_answers.concat(questionData.correct_answer).map((value, index) => {

                        // Logic to dynamically apply classes to a option  
                        let className = "";
                        if (value === answerData.selected) {
                            if (value === questionData.correct_answer) {
                                className = "correct-option"
                            } else {
                                className = "incorrect-option"
                            }
                        }
                        if (value === questionData.correct_answer) {
                            className = "correct-option"
                        }
                        
                        return (
                            <FormControlLabel
                                key={index}
                                disabled={value !== answerData.selected}
                                disableTypography
                                value={value}
                                label={<span dangerouslySetInnerHTML={{ __html: value }} />}
                                control={<Radio color={answerData.selected === questionData.correct_answer ? "success" : "error"} sx={{ cursor: "default" }} />}
                                className={className}
                                sx={{ cursor: "default" }}
                            />
                        )
                    })}
                </RadioGroup>
            </FormControl>
        </Box>
    )
}

export default ReportItem