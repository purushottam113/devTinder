const jwt = require('jsonwebtoken');
const User = require("../modules/user")

const userAuth = async (req,res,next)=>{
                try {
                   const token = await req.cookies.token;
                   const decodedUser = jwt.verify(token, "Moonlight")
                   const {_id} = decodedUser

                   const user = await User.findById("677fe9185c17aa5c852c9adb");

                   req.user = user
                   next()

                } catch (error) {
                    res.status(400).send("Error: " + error.message)
                }
            }

module.exports = {userAuth}