import mongoose, { Types } from "mongoose";
const blogSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    imageURL:{
        type:String,
        required:true
    },
    author:{type:mongoose.Schema.Types.ObjectId,ref:"Writer"},
    comments:[{type:mongoose.Schema.Types.ObjectId,ref:"Comment"}],
    likes:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}]
},{
    timestamps:true
})
const Blog=mongoose.model("Blog",blogSchema);
export default Blog;
