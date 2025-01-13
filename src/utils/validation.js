const validator = require("validator");

const isSigninValid = (req) => {
    const {firstName, lastName, emailID, password} = req

    if(!firstName || !lastName){
        throw new Error("Please enter the name");
    }
    else if(!validator.isEmail(emailID)){
        throw new Error("Enter a valid Email ID");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter a strong password")
    }
}

module.exports = {isSigninValid};