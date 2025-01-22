const express = require('express')
const userRouter = express.Router();

const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../modules/connectionRequest");
const User = require('../modules/user');

const userSafeData = "firstName lastName age skills about"


// User Received Requests API
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try {
        const loggedinUserId = req.user._id
        const status = "intrested"
    
        const userRequests = await ConnectionRequest.find({
            receiverId: loggedinUserId,
            status: status
        }).populate("senderId",userSafeData)
    
        res.send(userRequests)
    
        
    } catch (err) {
        res.status(400).send("Error: " + err.message)
    }
})

// User Connections API
userRouter.get("/user/connections", userAuth, async (req, res) => {
    try {
        const loggedinUserId = req.user._id
        const status = "accepted"

        const connectionList = await ConnectionRequest.find({
            $or: [
                {senderId: loggedinUserId, status: status},
                {receiverId: loggedinUserId, status: status},
            ]
        }).populate("senderId", userSafeData).populate("receiverId", userSafeData)

        const connectionData = connectionList.map((row) => {
            if(row.senderId._id == loggedinUserId) {
                return row.receiverId
            }
            else{
                return row.senderId

            }
        })

        res.send(connectionData)

    } catch (err) {
        res.status(400).send("Error: " + err.message)
    }
})

// feed API
userRouter.get("/feed", userAuth, async (req, res) =>{
    const loggedinUserId = req.user._id;
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit>50 ? 50 : limit;
    const skip = (page-1)*limit;

    const userConnection = await ConnectionRequest.find({
        $or: [{senderId: loggedinUserId},{receiverId: loggedinUserId}]
    }).select("senderId receiverId")

    const hideUserFromFeed = new Set();
    hideUserFromFeed.add(loggedinUserId)
    userConnection.forEach((data)=>{
        hideUserFromFeed.add(data.senderId.toString());
        hideUserFromFeed.add(data.receiverId.toString());
    })

    const feedUser = await User.find({
        _id: { $nin: Array.from(hideUserFromFeed)}
    }).select(userSafeData)
      .skip(skip).limit(limit)

    res.send(feedUser)

})
module.exports = userRouter