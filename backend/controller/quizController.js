const Quiz = require("../models/Quiz");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAcyncError = require("../middleware/catchAcyncError");


// Controller for saving quiz data to database
exports.createQuiz = catchAcyncError(async (req, res, next) => {
    const quiz = await Quiz.create(req.body);

    if(!quiz){
        return next(new ErrorHandler(500, "Internal server error"));
    }
    res.status(201).json({
        success: true,
        message: "Quiz data saved successfully!",
        result: quiz
    })
})

// Controller for fetching quiz data from the database
exports.getAllQuiz = catchAcyncError(async (req, res, next) => {
    const quiz = await Quiz.find({user: {_id: req.query.user}});

    if(!quiz){
        return next(new ErrorHandler(500, "Internal server error"));
    }
    res.status(200).json({
        success: true,
        result: quiz
    })
})