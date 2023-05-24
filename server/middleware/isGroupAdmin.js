import Chat from "../model/chatModel.js"

export const isAdmin = async (req,res,next)=>{
    const {id} = req.params
    const chat =await Chat.findById(id)
    if(req.user.id!=chat.groupAdmin){
        res.status(400)
        return next(new Error("Group name can only be changed by the group admin only"))
    }else next()
}