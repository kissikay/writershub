import mongoose from "mongoose";
const blogSchema= new mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:false,
    },
    imageURL:{
        type:String,
        default:null
    },
    author:{type:mongoose.Schema.Types.ObjectId,ref:"Writer"},
    comments:[{type:mongoose.Schema.Types.ObjectId,ref:"Comment"}],
    likes:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
    readCount:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}]
},{
    timestamps:true
})
const Blog=mongoose.model("Blog",blogSchema);
export default Blog;
