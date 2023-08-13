import Chat from "../model/chatModel.js";
import User from "../model/userModel.js";
import { getDataUri } from "../utils/dataUri.js";

export const accesChat = async (req, res, next) => {
  const { user } = req.body;
  if (!user) {
    res.status(401);
    return next(new Error("User is must"));
  }
  let isChat = await Chat.find({
    isGroupChat:false,
    $and: [
      { users: { $elemMatch: { $eq: req.user.id } } },
      { users: { $elemMatch: { $eq: user._id } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");
    isChat =await User.populate(isChat, {
      path: "lastMessage.sender",
      select: "name avatar email",
    });
  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatdata = {
      chatName: user.name,
      users: [req.user.id, user._id],
    };
    const newChat = await Chat.create(chatdata);
    const fullChat = await Chat.find(newChat._id).populate(
      "users",
      "-password"
    );
    res.status(200).send(fullChat);
  }
};

//get all chats

export const allChats = async (req, res, next) => {
 try{ const allChats = await Chat.find({
    users: { $elemMatch: { $eq: req.user.id } },
  })
    .populate("users", "-password")
    .populate("groupAdmin", "-password")
    .populate("latestMessage")
    .sort({ updatedAt: -1 });
  res.send(allChats).status(200);}
  catch(err){
    console.log(err);
  }
};

//create group chat

export const groupChat = async (req, res, next) => {
  let { users, name } = req.body;
 
  if (!users || !name) {
    res.status(401);
    return next(Error("all feilds are mandatory"));
  }
  users.push(req.user.id);
  if (users.length <= 2) {
    res.status(401);
    return next(Error("More than 2 users are required for the group chat"));
  }

  // const file = req.file;
  // const fileUri = getDataUri(file);
  // const result = await cloudinary.v2.uploader.upload(fileUri.content);

  const groupChat = await Chat.create({
    chatName:name,
    users,
    groupAdmin: req.user.id,
    isGroupChat: true,
    // groupAvatar:result.secure_url
  });
  const fullGroupChat = await Chat.find({ _id: groupChat._id })
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  res.status(200).send(fullGroupChat);
};

// rename group

export const renameGroup = async(req,res,next)=>{
    const {id} = req.params
    const {name} = req.body
    if(!id){
        res.status(400)
        return next(new Error("Group id is not in params"))
    }
    if(!name){
        res.status(400)
        return next(new Error("Name is required field"))
    }
    const updatedChat =await Chat.findByIdAndUpdate(id,{chatName:name},{new:true})
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
    if(!updatedChat){
        res.status(400)
        return next(new Error("Chat not found"))
    }else{
        res.status(200).send(updatedChat)
    }

}


//add user

export const addUser = async(req,res,next)=>{
    const {id} = req.params
    if(!id){
        res.status(400)
        return next(new Error("Please enter the Group id"))
    }
    const {user} = req.body
    if(!user.length){
        res.status(400)
        return next(new Error("Please select the user to add")) 
    }
    let groupChat = await Chat.findById(id)
    groupChat.users = groupChat.users.concat(user)
    // groupChat = groupChat.populate("users")
    groupChat.save()
    .then(result=>{return result.populate("users","-password")})
    .then(result=>{
      res.status(200).send(groupChat)
    })
}


//remove user
export const removeUser = async(req,res,next)=>{
    const {id} = req.params;
    if(!id){
        res.status(400)
        return next(new Error("Please enter the Group id"))
    }
    const {userId} = req.body
    console.log(userId);
    if(!userId){
        res.status(400)
        return next(new Error("Please select the user to remove"))
    }
    const groupChat = await Chat.findById(id)
    const users = groupChat.users.filter((item)=>item.toString()!==userId)

    if(users.toString()===groupChat.users.toString()){
        res.status(400)
        return next(new Error("User not found"))
    }
    groupChat.users = users
    groupChat.save()
    .then(result=>{return result.populate("users","-password")})
    .then(result=>{
      res.status(200).send(groupChat)
    })
    console.log(groupChat);
}

// getSingle chat

export const singleChat = async(req,res,next)=>{
  try{const {id} = req.params;
  if (!id) {
    return next(new Error("ID is must"));
  }
  const chat = await Chat.findById(id).populate("users","-password");

  res.status(200).send(chat);}
  catch(err){
    console.log(err);
  }
}