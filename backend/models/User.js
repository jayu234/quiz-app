const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provide your email"],
        unique: true,
        validate: [validator.isEmail, "Please provide valid email"]
    }
},
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;