import chatModel from "../model/chatModel.js";
import messageModel from "../model/messageModel.js"
import userModel from "../model/userModel.js";


export const getMsg = async(req,res,next)=>{
    try{
        const {chatId} = req.params
        if(!chatId){
            return next(new Error("user is required"));
        }
        const data = await messageModel.find({chat:chatId})
        .populate("sender","name avatar email")
        .populate("chat");
        await userModel.populate(data,{
            path:'chat.users',
            select:'name avatar email'
        })
        res.send(data).json({success:true,msg:"successfully get msg"})
}catch{(err)=>{
    res.status(400);
    throw new Error(err.message)
}}
}


export const sendMsg = async(req,res,next)=>{
   try{
    const {content,chatId} = req.body;
    if (!content || !chatId) {
        return next(new Error("content and chatId is must"));
    }
    let newMsg = {
        chat:chatId,
        content,
        sender:req.user.id
    }
    let msg = await messageModel.create(newMsg);
    msg =await msg.populate("sender","name avatar");
    msg =await msg.populate("chat");
    msg =await userModel.populate(msg,{
        path:"chat.users",
        select:"name avatar email"
    })
    await chatModel.findByIdAndUpdate(chatId,{
        latestMessage:msg
    })

    res.status(200).json({
        success:true,
        data:msg
    })

}catch(err){
    return new Error(err)
}
}

export const deleteMsg = async(req,res,next)=>{
    try {
        const {id} = req.params;
        if (!id) {
            return next(new Error("msg id is not available"));
        }
        const data = await messageModel.findByIdAndDelete(id);
        res.status(200).json({
            success:true,
            data
        })
    } catch (error) {
        res.status(400).json({error:error.message});

    }
}



