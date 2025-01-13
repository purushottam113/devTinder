const express = require("express");
const app = express();
const {userAuth} = require("../middleware/auth")
const profileRouter =  express.Router();

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
        res.send(req.user)
    } catch (error) {
        res.status(400).send("Error: " + err.message)
    }
})

// Profile change Password API
profileRouter.patch("/profile/changePassword",userAuth, async (req, res) => {
    try {
        res.send(req.user)
    } catch (error) {
        res.status(400).send("Error: " + err.message)
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