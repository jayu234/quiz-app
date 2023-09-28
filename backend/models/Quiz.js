const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
    user: {
        type: { _id: mongoose.Schema.Types.ObjectId },
        required: true,
        ref: "User"
    },
    answers: {
        type: [{
            question: {
                type: String
            },
            selected: {
                type: String
            },
            correct_answer: {
                type: String
            },
            incorrect_answers: {
                type: [{type: String}]
            },
            _id: false
        }
        ]
    }
},
    { timestamps: true }
);

const Quiz = mongoose.model("Quiz", quizSchema);
module.exports = Quiz;