import Blog from '../models/blog.js'
export const newBlog=async (req,res)=>{
try{
        const {title,body,img,cat}=req.body;
        const authorId=req.user._id;
        console.log(req.body)
        if( !title || !body || !img || !authorId){
            res.render("Error",{"error":"all fields are required"})
        }
        const validFormat=/^.*\.(jpg|jpeg|png|webp)$/i; 
        if(!validFormat.exec(img)){
            res.render("Error",{"error":"Invalid image format"})
        }
        const newBlog=new Blog({title:title,body:body,authorId:authorId,category:cat});
        await newBlog.save();
    }catch(error){
        console.log(error)
        res.render("Error",{"error":"An error occurred please try again"})
    }
}
export const myBlogs=async(req,res)=>{
    try{
        // const id=req.user.id;
        // const title=req.body;
        // if( !id || !title ){
        //     res.status(400).json("All fields are required")
        // }
        const blogs=[
      {
        title: "Halo",
        body: "This is a book that talks about war between humans and aliens.",
        imgUrl: "/images/spidey.jpg"
      },
      {
        title: "Mass Effect",
        body: "An intergalactic story about humans and aliens working together.",
        imgUrl: "/images/mass-effect.jpg"
      },
      {
        title: "Dune",
        body: "A sci-fi epic about power, politics, and spice on a desert planet.",
        imgUrl: "/images/dune.jpg"
      }
    ];
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
        const title=req.params.title;
        const userid=req.user.id;
        if( !title || !userid ){
            res.render("Error",{"error":"All fields are required"})
        }
    const blog=await Blog.findOne({title:title,author:userid});
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