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

const isEditValidator = (req) => {
    const validList = ["firstName", 
        "lastName", 
        "age", 
        "about",
        "gender",
        "skills",
        "profileURL"
    ]

    const isEditValid = Object.keys(req.body).every(validList.includes(key));
    return isEditValid;
}

const changePasswordValidator = (req) =>{
    const {emailID, password} = req;

    if(!validator.isEmail(emailID) || !password){
        throw new Error("invalid Creditionals");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter strong password")
    }
}

module.exports = {isSigninValid, isEditValidator, changePasswordValidator};