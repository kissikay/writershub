import Blog from "../models/blog.js";
import Comment from "../models/comment.js";
export const addlike=async(req,res)=>{
    try{
        const blogId=req.params.blogId;
        const userId=req.user[0].id;
        const blog=await Blog.findById(blogId);
        if(!blog){
           return res.status(404).json("Blog not found")
        }
         const index=blog.likes.indexOf(userId);
        if(index===-1){
           return res.status(400).json("You haven't liked this post")
        }
        if(blog.likes.includes(userId)){
            blog.likes.splice(index,1);
        }
        res.json({'message':'like removed'})
        blog.likes.push(userId)
        await blog.save();
    }catch(error){
        res.status(500).json("An error occurred please try again")
    }
 }
// export const removeLike=async(req,res)=>{
//     try{
//         const blogId=req.params.blogId;
//         const userId=req.user._id;
//         const blog=await Blog.findById(blogId)
//         if(!blog){
//            return res.status(404).json("Blog not found")
//         }
//        
        
//         await blog.save();
//         res.json("Like removed successfully");
//     }catch(error){
//         res.status(500).json("An error occurred please try again")
//     }
// }
export const addComment=async(req,res)=>{
    try{
    const blogId=req.params.blogId;
    const userId=req.user._id;
    const text=req.body.text;
    const blog=await Blog.findById(blogId)
    if(!blog){
        res.status(404).json("Not found!")
    }
    const comment=new Comment({
        text:text,
        user:userId,
        blog:blogId
    })
    await comment.save();
    res.json("comment added")
}catch(error){
    res.status(500).json("An error occurred Please try again");
}
};
// Complete this code
export const removeCommment=async(req,res)=>{
    try{
        const {blogId,userId}=req.body;
        if(!blogId){
            res.status(400).json('Id not provided')
        }
        
    }catch(error){
        console.log(error)
        res.status(500).json("Eror while deleting comment")
        }
}
