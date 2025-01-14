const moongose = require(moongose);
const {Schema} = moongose

const connectionRequestSchema = new Schema({
     senderId :{
        value: moongose.ObjectId,
        required: true
     },
     receiverId :{
        value: moongose.ObjectId,
        required: true
     },
     status :{
        value: String,
        required: true
     }
},
{
    timestamp : true
}
)

const connectionRequest = moongose.model("connectionRequest", connectionRequestSchema)
model.export = connectionRequest;
