const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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
            if(!validator.isEmail(value)){
                throw new Error("Please enter valid Email")
            }
        }
    } ,
    password : {
        type : String,
        required : true,
        validate(value){
            if(!validator.isStrongPassword(value)){
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
        lowercase: true,
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
            if(!validator.isURL(value)){
                throw new Error("Please enter valid URL")
            }
        }
    }
} ,
    {
        timestamps: true, 
    }
);

userSchema.methods.getJWT = async function (){
    const user = this;

    const jwtToken = await jwt.sign({_id :user._id}, "Moonlight", {expiresIn: '7d'});
    return jwtToken;
}

userSchema.methods.isPasswordValid = async function (UserInputPassword){
    const user = this;
    const hashPassword = user.password;

    const isPasswordValid = await bcrypt.compare(UserInputPassword, hashPassword);
    return isPasswordValid;

}

const User = mongoose.model("User", userSchema);

module.exports = User;