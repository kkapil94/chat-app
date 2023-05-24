import jwt from "jsonwebtoken"

const Token = (user)=>{
    const token = jwt.sign({
        user:{
            username:user.gmail,
            id:user._id
        }
    },process.env.TOKEN_SECRET,{
        expiresIn:"15m"
    })
    return token
}

export default Token