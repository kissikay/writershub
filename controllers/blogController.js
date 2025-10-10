import Blog from '../models/blog.js'
export const newBlog=async (req,res)=>{
try{
        const {title,snippet,imgUrl}=req.body;
        const authorId=req.user._id;
        if(!title||!snippet||!imgUrl||!authorId){
            res.status(400).json("all fields are required")
        }
        const newBlog=new Blog({title,snippet,imgUrl,authorId});
        await newBlog.save();
    }catch(error){
        console.log(error)
    }
}
export const myBlogs=async(req,res)=>{
    try{
        const id=req.body;
        if(!id){
            res.status(400).json("All fields are required")
        }
        const blogs= await Blog.findById(id)
        res.json(blogs)
    }catch(error){
        console.log(error)
    }
}
export const singleBlog=async(req,res)=>{
    try{
        const {title,userid}=req.body;
        if(!title||!userid){
            res.status(400).json('Please provide blog title')
        }
    const blog=await Blog.findOne(title,userid)
    res.json(blog)
    }catch(error){
        console.log(error)
    }
}
export const editBlog=async(req,res)=>{
    try{
        const {title,newContent,userid}=req.body;
        if(!title||!newContent||!userid){
            res.status.json("Please provide blog content")
        }
        await Blog.findOneAndUpdate(title,{$set:{body:newContent}},(err)=>{
            if(err) throw err;
            res.status(200).json("Blog Updated!")
        })
    }catch(error){
        console.log(error)
        res.status(502).json("Update failed")
    }
}