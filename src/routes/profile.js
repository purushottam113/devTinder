const express = require("express");
const app = express();
const {userAuth} = require("../middleware/auth")
const profileRouter =  express.Router();
const {isEditValidator, changePasswordValidator} = require("../utils/validation");
const User = require("../modules/user");

// Profile view API
profileRouter.get("/profile/view",userAuth, async (req, res) => {
    try {
        res.send(req.user)
    } catch (error) {
        res.status(400).send("Error: " + err.message)
    }
})

// Profile edit API
profileRouter.patch("/profile/edit",userAuth, async (req, res) => {
    try {
        if(!isEditValidator){
            throw new Error("invalid edit field")
        }

        const logInUser = req.user;
        const editFields = req.body;

        Object.keys(editFields).forEach(key => logInUser[key] = editFields[key] );

        await logInUser.save()
        
        res.send(req.user)

    } catch (err) {
        res.status(400).send("Error: " + err.message)
    }
})

// Profile change Password API
profileRouter.patch("/profile/changePassword", async (req, res) => {
    try {
        changePasswordValidator(req.body);
        const {emailID, password} = req.body

        const user = await User.findOneAndUpdate({emailID: emailID}, {password:  password})
        
        if(!user){
            throw new Error("Invalid Creditionals")
        }

        res.send("Password Update Sucessfully!!")

    } catch (error) {
        res.status(400).send("Error: " + error.message)
    }
})

// Profile edit API
profileRouter.delete("/profile/deleteProfile",userAuth, async (req, res) => {
    try {
        res.send(req.user)
    } catch (error) {
        res.status(400).send("Error: " + err.message)
    }
})

module.exports = profileRouter;