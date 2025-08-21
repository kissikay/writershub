import mongoose from "mongoose";
const admin=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    }
})
const Admin=mongoose.model("Admin",admin);
module.exports=Admin;