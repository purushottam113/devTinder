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


// json middilware
app.use(
    express.json()
)

// Update user data in database
app.patch("/user/:userID",async (req,res)=>{    
    const data = await req.body;
    const userID = await req.params?.userID;
    
    try {
        const Allowed_Updates = ["userID", "firstName", "lastName", "age", "gender", "skills"]

        const isAllowedUpdates = Object.keys(data).every((k)=>
                                    Allowed_Updates.includes(k)
                                );
        if(!isAllowedUpdates){
            throw new Error("Enter proper keys")
        };

        if(data.skills.length > 10){
            throw new Error("Skills upto 10")
        }

        await User.findByIdAndUpdate(userID, data, {
            runValidators : true
        });

        res.send("Data Update Succesfully")

    } catch (error) {
        res.status(400).send("someting went wrong: " + error.message);
    };
});

// Update user data in database
app.put("/user",async (req,res)=>{
    try {
        const data = await req.body;
        const userID = await req.body.userID;

        await User.findByIdAndUpdate(userID, data);
        res.send("Data Update Succesfully")

    } catch (error) {
        res.status(400).send("someting went wrong");
    }
})

// Delete user
app.delete("/user", async (req,res)=>{
    try {
        const deletedID = await User.findByIdAndDelete(req.body.userID)
        res.send("User Delete Successfully")
    } catch (error) {
        res.status(400).send("Someting went  wrong");
    }

})

//get data by email
app.get("/user", async (req,res)=>{
    try{
        const userDetails = await User.find(req.body);

        if(userDetails.length === 0){
            res.send("User not found")
        }
        else{
            res.send(userDetails)
        }
    }
    catch(err){
        res.status(400).send("Something went wrong")
    }
})

//get all data 

app.get("/feed", async (req,res)=>{
    try{
        const users = await User.find({});

        if(users.length === 0){
            res.send("User not found")
        }
        else{
            res.send(users)
        }
    }
    catch(err){
        res.status(400).send("Something went wrong")
    }
})

// signup route
app.post("/signup", async (req,res)=>{

    const user = new User(req.body)

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