const express = require("express");
const app = express();
const cors = require("cors"); 

const dotenv = require('dotenv');
dotenv.config({path: "config/config.env"});

app.use(cors({
    origin: process.env.FRONTEND,
    credentials: true,
}));
app.use(express.json());

// Two main Routes
const users = require("./routes/userRoutes");
const quiz = require("./routes/quizRoutes");

app.use("/api/v1", users);
app.use("/api/v1", quiz);

// A middleware is used to handle errors.
const errorMiddleware = require("./middleware/error");

app.use(errorMiddleware);
module.exports = app;