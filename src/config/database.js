const mongoose = require("mongoose")

const connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://NamsteNodeJs:Namste_2207@cluster0.ybwzc.mongodb.net/devtinder?retryWrites=true&w=majority&appName=Cluster0");
}

module.exports = connectDB

