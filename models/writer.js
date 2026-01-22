import mongoose from "mongoose";

const writerSchema = new mongoose.Schema({
    id:{
     type:String,
     required:true
    },
     firstname: {
         type: String,
         required: true
    },
    lastname: {
         type: String,
         required: true
    },
    username: {
         type: String,
         required: true
    },
    email: {
         type: String,
         required: true
    },
    bio: {
         type: String,
         required: true
    },
    password: {
         type: String,
         required: true
    },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    point:{
            type:Number,
          default:0
    },
    role: {
        type: String,
        required: true,
        default: "writer"
    },
    blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }]
});
const Writer = mongoose.model("Writer", writerSchema);
export default Writer;