const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        minLength  : 4,
        maxLength : 20,
        trim : true,
    },
    lastName : {
        type : String,
        trim : true,
    } ,
    emailID : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
    } ,
    password : {
        type : String,
        required : true,
    } ,
    age : {
        type : Number,
        min : 18,
    } ,
    gender : {
        type : String,
        trim : true,
        validate(value){
            if(!["male", "female", "others"].includes(value)){
                throw new Error("Gender data is not valid");
            }
        },      
    } ,
    about : {
        type : String,
        default : "Hi... I am devTinder user...."
    } ,
    skills : {
        type : [String],
    } ,
} ,
    {
        timestamps: true, 
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;