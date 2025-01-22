const express = require("express");
const app = express();
const User = require("../modules/user.js")
const {isSigninValid} = require("../utils/validation.js")
const bcrypt = require('bcrypt');
const validator = require('validator');
const authRouter =  express.Router();


//Login 
authRouter.post("/login", async (req,res) => {
    try {
        const {emailID, password} = req.body

        const isEmailID = validator.isEmail(emailID);
        if(!isEmailID){
            throw new Error("Invalide EmailID..")
        }

        const user = await User.findOne({emailID: emailID})

        if(!user){
            throw new Error("Invalide Creditionals..")
        }

        const isPasswordValid = await user.isPasswordValid(password);
        if(!isPasswordValid){
            throw new Error("Invalide Creditionals..") 
        }   
        else{
            //Create Token
            const jwtToken = await user.getJWT()

            // Send user Token
            res.cookie("token", jwtToken, { expires: new Date(Date.now() + 604800000)});
            res.send("Login Sucessfully!!!!")
        }   


    } catch (err) {
        res.status(400).send("Error: " + err.message)
    }
})

// signup route
authRouter.post("/signup", async (req,res)=>{
    try{
        // validate a req.body
        isSigninValid(req.body)
        // encript the password
        const {firstName, lastName, emailID, password, skills, age, gender, about} = req.body

        const hashPassword = await bcrypt.hash(password,10)

        const validData = {
            firstName,
            lastName,
            emailID,
            skills,
            password : hashPassword,
            age,
            gender,
            about
        }

        const user = new User(validData)
        await user.save();
        res.send("Data Stored Succesfully")
    }
    catch(err){
        res.status(400).send("Error: " + err.message)
    }
})

// Logout API
authRouter.post("/logout", (req, res) => {
    // res.cookie("token", null, {
    //     expires: new Date(Date.now())
    // })
    res.clearCookie("token");
    res.send("Logout Sucessful !!!")
})

module.exports = authRouter;