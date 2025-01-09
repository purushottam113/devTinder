const mongoose = require("mongoose");
const { isStrongPassword } = require("validator");
const { default: isEmail } = require("validator/lib/isEmail");

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
        validate(value){
            if(!isEmail(value)){
                throw new Error("Please enter valid Email")
            }
        }
    } ,
    password : {
        type : String,
        required : true,
        validate(value){
            if(!isStrongPassword(value)){
                throw new Error("Please enter strong password")
            }
        }
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
    profileURL : {
        type : String,
        validate(value){
            if(!isURL(value)){
                throw new Error("Please enter valid URL")
            }
        }
    }
} ,
    {
        timestamps: true, 
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;