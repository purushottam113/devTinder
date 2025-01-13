const express = require("express");
const app = express();
const {userAuth} = require("../middleware/auth")
const requestRouter =  express.Router();

//sendConnectionRequest API
requestRouter.get("/sendConnectionRequest", userAuth, (req,res) => {
    try {
        const requestedUserName = req.user.firstName;
        res.send(requestedUserName+ " send a connection request")
    } catch (error) {
        res.status(404).send("Error: " + error.message);
    }
})

module.exports = requestRouter;