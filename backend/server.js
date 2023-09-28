/**
 * 
 * Entry point of the server
 * 
 */

const app = require('./app');

const dotenv = require('dotenv'); // package used to proccess evironment variables
dotenv.config({path: "config/config.env"});

// Function to connect to DataBase
const connectToMongo = require('./config/db');
connectToMongo();

app.listen(process.env.PORT, ()=>{
    console.log(`Server running at ${process.env.HOST}:${process.env.PORT}`);
})