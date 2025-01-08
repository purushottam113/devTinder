const auth = (req,res,next)=>{
                const authUser = true

                if(!authUser){
                    res.status(404).send("Not Authorised user")
                }else{
                     next()
                }
            }

module.exports = {auth}