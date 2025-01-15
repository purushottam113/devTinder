const express = require("express");
const app = express();
const {userAuth} = require("../middleware/auth");
const User = require("../modules/user");
const ConnectionRequest = require("../modules/connectionRequest")
const requestRouter =  express.Router();

// Intrested/Ignored status API
requestRouter.post("/request/send/:status/:id", userAuth, async (req,res) => {
    try {
        const status  = req.params.status
        const receiverId = req.params.id
        const user = req.user
        const senderId = user._id
        const senderName = user.firstName

        const validStatus = ["intrested", "ignored"].includes(status)

        if(!validStatus){
            throw new Error("request status is not valid")
        }

        if(senderId == receiverId){
            throw new Error("can not send connection request yourself")
        }

        const receiverData = await User.findById(receiverId)
        
        if(!receiverData){
            return res.json({
                "message": "User not found"
            })
        }
        
        const isRequestAlreadyExist = await ConnectionRequest.find({$or:[
            {senderId,receiverId},
            {senderId: receiverId, receiverId:senderId}
        ]})

        if(isRequestAlreadyExist.length > 0){
            return res.json({
                "message": "Connection request already exist"
            })
        }

        const receiverName = receiverData.firstName
        
        res.json({
            "message": senderName + " " + status + " " + receiverName
        })

        const validConnectionRequest = {
            senderId,
            receiverId,
            status
        } 

        const connectionRequest = await new ConnectionRequest(validConnectionRequest)

        connectionRequest.save();

    } catch (err) {
        res.status(404).send("Error: " + err.message);
    }
})

// Accepted/Rejected Connection request API
requestRouter.post("/request/review/:status/:requestedId", userAuth, async (req, res) => {
    try {
        const {status, requestedId} = req.params
        const receiverId = req.user._id

        const isStatusValid = ["accepted", "rejected"].includes(status)
        if(!isStatusValid){
            throw new Error("Status not valid")
        }

        const connectionRequest = await ConnectionRequest.findOne({
            _id: requestedId,
            receiverId: receiverId,
            status: "intrested"
        })

        if(!connectionRequest){
            res.send("Connection Request not found")
        }

        connectionRequest.status = status

        await connectionRequest.save()

        res.send("You Accepted Connection Request")
    } catch (error) {
        res.send("Error: "+ error.message)
    }
})

module.exports = requestRouter;