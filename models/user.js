import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    id:{type:String,required:true},
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
        
    },
    role:{
        type:String,
        required:true,
        default:"user"
    }
})
const User=mongoose.model("User",userSchema);
export default User;