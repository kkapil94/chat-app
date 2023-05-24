import User from "../model/userModel.js"
import bcrypt from "bcrypt"
import Token from "../utils/webtoken.js";

// register user

export const register = async (req,res,next)=>{
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      };
    const {name,email,password} = req.body;
    if(!name || !email || !password){
        res.status(400);
        return next(new Error("Please enter all the fields"))
    }
    const user =await User.findOne({email});
    if(user){ 
        res.status(400)
        return next(new Error("user alreday exist with this email"))
    }
    const hashedPass = await bcrypt.hash(password,10)
    const result = await cloudinary.uploader.upload(imagePath, options);
    const newUser =await User.create({name,email,password:hashedPass,avatar:result.public_id});

    const token = Token(newUser)
    console.log(newUser,token);
    res.header("auth-token", token).status(200).json({
        success:true,
        msg:"user registered successfully",
        newUser,
        token
    })
}


//login

export const login = async (req,res,next)=>{
    const {email,password} = req.body;
    if(!email || !password){
        res.status(400);
        return next(new Error("Please enter all the fields"))
    }
    const user =await User.findOne({email});
    if(!user){ 
        res.status(400)
        return next(new Error("Please enter the valid credentials"))
    }
    const isMatched = await bcrypt.compare(password,user.password)
    if(isMatched){
        const token = Token(user)
        res.status(200).header("auth-token", token).json({
            success:true,
            msg:"user logged in successfully",
            user,
            token
        })
    }else{
        return next(new Error("Please enter the valid credentials"))
    }
}

// current user

export const allUsers = async(req,res)=>{
    const keyword = req.query.search?
    {
        $or:[
            {name:{$regex:req.query.search,$options:"i"}},
            {email:{$regex:req.query.search,$options:"i"}}
        ]
    }:{}
    const users =await User.find(keyword).find({_id:{$ne:req.user._id}})
    res.status(200).json({success:true,users})
}