import jwt from "jsonwebtoken"

export const isValidated = (req,res,next)=>{
    const accesstoken = req.headers.authorization
    if(!accesstoken)
    {
        res.status(400)
        return next(new Error("user is not authorised"))}
    const token = accesstoken.split(" ")[1];
    if(!token)
    {
        res.status(400)
        return next(new Error("unauthorized access"))
    }
    const verified = jwt.verify(token,process.env.TOKEN_SECRET,(err,decoded)=>{
        if(err){
            res.status(401);
            throw new Error("Unautorized access");
        }
        req.user = decoded.user
        next()
    });
}