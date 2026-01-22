import Blog from '../models/blog.js'
import Writer from '../models/writer.js'
import User from '../models/user.js';
export const newBlog=async (req,res)=>{
try{
        const {title,body,img,cat}=req.body;
        const authorId=req.user[0].id;
        const blogId=`bid${Number(Date.now())}`;
        console.log(req.body,authorId)
        if( !title || !body || !authorId){
            res.render("Error",{"error":"all fields are required"})
        }
        const existingBlog = await Blog.findOne({title:title,author:authorId});
            if(existingBlog){
                return res.render("Error",{"error":"Blog with same title already exists"})
            }
        const newBlog=new Blog({id:blogId,title:title,body:body,category:cat,author:authorIdi});
        (async( )=>{
           const w= await Writer.findOne({_id:authorId})
           w.blogs.push(newBlog._id);
           await w.save().catch((err)=>{console.log(err)});
        })()
        await newBlog.save();
        res.render("message",{'message':"blog created successfully"})
    }catch(error){
        console.log(error)
        res.render("Error",{"error":"An error occurred while saving blog, please try again"})
    }
}
export const myBlogs=async(req,res)=>{
    try{
        const authorId=req.user[0]._id;
        const blogs=await Blog.find({author:authorId}).populate('author');
        res.render("posts",{blogs})
    }catch(error){
        console.log(error)
    }
}
export const searchBlogs=async(req,res)=>{
    try {
        const id=req.user[0].id;
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
        const title=req.params.title;
        console.log(title)
        const userid=req.user[0]._id;
        if( !title || !userid ){
            res.json("Please provide title")
        }
        console.log(userid)
    const blog=await Blog.findOne({title:title,author:req.user[0]._id}).populate('author');
    console.log(blog)
    res.render("writerBlogs",{blog});
    }catch(error){
        res.render("Error",{"error":"An error occured while opening blog"})
        console.log(error)
    }
}
export const editBlog= async(req,res)=>{
    try{
        const {title,newContent}=req.body;
        const wid= req.user[0].id;
        if(!title || !newContent ){
            res.render("error",{"error":"Please provide"})
        }
        await Blog.findOneAndUpdate({title:title},{$set:{body:newContent}},(err)=>{
            if(err) throw err;
            res.json({'message':'blog not found'})
        }).populate('author');
    }catch(error){
        console.log(error)
        res.render("Error",{"error":"Update failed!"});
    }
}
// export const favoriteBlogs=async(req,res)=>{
//     try {
//         const user=req.user[0].id;
//         if(!user) res.render("Error",{"error":"An error occured"});
//         const currentUser=User.findOne({_id:user});
        
//         const allBlogs=[];
//         blogs.forEach(blog => {
//              Blog.find({id:blog})
//         });
//         blogs
//     } catch (error) {
        
//     }
// }