const mongoose = require("mongoose");
const {Schema} = mongoose

const connectionRequestSchema = new Schema({
     senderId :{
        type: mongoose.ObjectId,
        required: true
     },
     receiverId :{
        type: mongoose.ObjectId,
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
