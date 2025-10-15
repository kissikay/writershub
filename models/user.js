import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    id:{type:String,required:true},
    username:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },dob:{
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