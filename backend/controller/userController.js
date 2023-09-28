const catchAcyncError = require("../middleware/catchAcyncError");
const User = require("../models/User");
const ErrorHandler = require("../utils/ErrorHandler");


// Controller for user login
exports.login = catchAcyncError(async (req, res, next) => {

    if (!req.body || !req.body.email) {
        return next(new ErrorHandler(400, "Please provide email"));
    }

    const existing = await User.findOne({ email: req.body.email });

    if (existing) {
        return res.status(201).json({
            success: true,
            result: existing
        })
    }
    const user = await User.create(req.body);

    if (!user) {
        return next(new ErrorHandler(500, "Somthing went wrong!!"))
    }

    return res.status(201).json({
        success: true,
        result: user
    })
})