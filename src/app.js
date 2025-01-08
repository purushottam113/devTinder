const {auth} = require("./middleware/auth.js")
const connectDB = require("./config/database")
const User = require("./modules/user.js")

const express = require("express");
const app = express();

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

app.post("/signUp", async (req,res)=>{
    const user = new User({
        firstName : "Sachin",
        lastName : "Tendulkar",
        emailID : "Sachin@shaTendulkar.com",
        age : 45,
        gender : "male"
    })

    try{
        await user.save();
        res.send("Data Stored Succesfully")
    }
    catch(err){
        res.status(400).send("Data not Stored : " + err.message)
    }
})

app.use("/", (req, res)=>{
    res.send("HomePage on 3000")
})