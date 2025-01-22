const express = require("express");
const app = express();
const {userAuth} = require("./middleware/auth.js")
const connectDB = require("./config/database")
const cookieParser = require('cookie-parser');
const authRouter = require("./routes/auth.js")
const profileRouter = require("./routes/profile.js")
const requestRouter = require("./routes/request.js");
const userRouter = require("./routes/user.js");

connectDB()
    .then(()=>{
            console.log("Database connection Established..")

            app.listen(3000, ()=>{
                console.log("Server running on Port No. 3000");
            })

        })
    .catch((err)=>{
        console.error("DB not connected!!")
        console.log(err)
        }
    )


// json middilware
app.use(express.json());
//cookies parser middleware
app.use(cookieParser());

app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", requestRouter)
app.use("/", userRouter)

app.use("/", (req, res)=>{
    res.send("HomePage on 3000")
})