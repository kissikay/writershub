import Blog from '../models/blog.js'
export const newBlog=async (req,res)=>{
try{
        const {title,snippet,imgUrl}=req.body;
        const authorId=req.user._id;
        if( !title || !snippet || !authorId){
            res.render("Error",{"error":"all fields are required"})
        }
        const newBlog=new Blog({title,snippet,imgUrl,authorId});
        await newBlog.save();
    }catch(error){
        console.log(error)
        res.render("Error",{"error":"An error occurred please try again"})
    }
}
export const myBlogs=async(req,res)=>{
    try{
        const id=req.user.id;
        const title=req.body;
        if( !id || !title ){
            res.status(400).json("All fields are required")
        }
        const blogs= await Blog.find({"title":title})
        res.render("posts",{"blogs":blogs})
    }catch(error){
        console.log(error)
    }
}
export const searchBlogs=async(req,res)=>{
    try {
        const id=req.user.id;
        const {searchkey,type}=req.body;
        if(!id || !searchkey || !type){
            res.render("Error",{"error":"All details are to be provided!"})
        }
        const blogs=await Blog.find();
        if(!blogs){
            res.render("Error",{"error":"No results found!"})
        }
        res.render("posts",{"blogs":blogs})
    } catch (error) {
        res.render("Error",{"error":"An error occured. Please try again!"})
    }
}
export const singleBlog=async(req,res)=>{
    try{
        const title=req.body;
        const userid=req.user.id;
        if( !title || !userid ){
            res.render("Error",{"error":"All fields are required"})
        }
    const blog=await Blog.findOne(title);
    res.render("post",{"blog":blog});
    }catch(error){
        res.render("Error",{"error":"An error occured while opening blog"})
        console.log(error)
    }
}
export const editBlog= async(req,res)=>{
    try{
        const {title,newContent}=req.body;
        const wid= req.user.id;
        if(!title || !newContent || !wid ){
            res.render("error",{"error":"Please provide"})
        }
        await Blog.findOneAndUpdate({title:title,author:wid},{$set:{body:newContent}},(err)=>{
            if(err) throw err;
            res.render("Message",{"message":"Blog Updated!"})
        })
    }catch(error){
        console.log(error)
        res.render("Error",{"error":"Update failed!"});
    }
}