import mongoose from "mongoose"

export const db=async(req,resizeBy,next)=>{
    try{
        await mongoose.connect(process.env.dburi);
        console.log("DB connected!")
    }catch(error){
        console.log(error)
    }
}