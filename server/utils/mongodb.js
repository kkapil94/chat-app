import mongoose from "mongoose"


export const connect = ()=>{
    try {
        mongoose.connect("mongodb://localhost:27017").then(()=>console.log("mongodb connected successfully"))
    } catch (error) {
        console.log(error);
    }
}