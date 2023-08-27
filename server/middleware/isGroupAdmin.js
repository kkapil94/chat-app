import Chat from "../model/chatModel.js"

export const isAdmin = async (req,res,next)=>{
    try{const {id}= req.params
    const chat =await Chat.findById(id)
    if(req.user.id!=chat.users[0]){
        res.status(400)
        return next(new Error("Group can only be changed by the group admin only"))
    }else next()}
    catch(err){
        console.log(err);
    }
}