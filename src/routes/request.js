const express = require("express");
const app = express();
const {userAuth} = require("../middleware/auth");
const User = require("../modules/user");
const requestRouter =  express.Router();

//sendConnectionRequest API
requestRouter.post("/request/:status/:id", userAuth, async (req,res) => {
    try {
        const user = req.user
        const status  = req.params.status
        const receiverId = req.params.id
        const senderName = user.firstName

        const receiverData = await User.findById(receiverId)
        const receiverName = receiverData.firstName

        res.json({
            "message": senderName + " " + status + " " + receiverName
        })

    } catch (error) {
        res.status(404).send("Error: " + error.message);
    }
})

module.exports = requestRouter;