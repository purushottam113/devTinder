const mongoose = require("mongoose");
const User = require("./user");
const {Schema} = mongoose

const connectionRequestSchema = new Schema({
     senderId :{
        type: mongoose.ObjectId,
        ref: User,                        // reference table from User we can access it using populate
        required: true
     },
     receiverId :{
        type: mongoose.ObjectId,
        ref: User,
        required: true
     },
     status :{
        type: String,
        required: true,
        enum: {
         values: ["ignored", "intrested", "accepted","rejected"]
        }
     }
},
{
    timestamp : true
}
)

const ConnectionRequest = new mongoose.model("ConnectionRequest", connectionRequestSchema)
module.exports = ConnectionRequest;
