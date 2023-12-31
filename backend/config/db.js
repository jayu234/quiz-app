const mongoose = require("mongoose");


// Utility function to connect to MongoDB database.
const connectToMongo = ()=>{
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
    .then((data)=>{console.log(`Connected to  mongo successfully at host: ${data.connection.host}`);})
    .catch((err)=>{console.log(err);});
    
}

module.exports = connectToMongo;