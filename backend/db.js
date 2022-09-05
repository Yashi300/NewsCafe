const mongoose = require("mongoose");
const mongoURI ="mongodb+srv://Yashi_7103:Yashi123@cluster0.rt2ewjo.mongodb.net/inotebook"

// const mongoURI = "mongodb+srv://localhost:27017/"
// const mongoURI = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"

const connectToMongo = () => {
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to Mongo Successfully");
    })
}

module.exports = connectToMongo;