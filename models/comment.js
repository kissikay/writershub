import mongoose from "mongoose";
const comment=new mongoose.Schema({
    text:{type:String,required:true},
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    blog:{type:mongoose.Schema.Types.ObjectId,ref:"Blog"}
},
{
    timestamps:true
}
)
const Comment=mongoose.model("Comment",comment)
export default Comment;