const express = require("express");
const app = express();
app.listen(3000, ()=>{
    console.log("Server Started on Port No. 3000");
})
app.use("/", (req, res)=>{
    res.send("HomePage on 3000")
})