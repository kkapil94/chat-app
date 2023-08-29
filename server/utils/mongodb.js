import mongoose from "mongoose"


export const connect = async()=>{
    try {
       await mongoose.connect(process.env.MONGO_URL).then(()=>console.log("mongodb connected successfully"))
    } catch (error) {
        console.log(error);
    }
}
