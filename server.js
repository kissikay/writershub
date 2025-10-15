import express from 'express';
import cors from 'cors';
import userRoute from "./routes/userRoute.js"
import blogRoute from "./routes/blogRoute.js"
import writerRoute from "./routes/writerRoute.js"
import commentRoute from "./routes/commentRoute.js";
import { db } from './utils/database.js';
import dotenv from "dotenv"
import morgan from 'morgan';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"))
app.set('view engine', 'ejs');
//Rest API endpoints 
app.use("/user",userRoute)
app.use("/blog",blogRoute)
app.use("/writer",writerRoute) 
app.use("/comment",commentRoute)   
//Rendering
app.get('/',(req,res)=>{
    res.render('index');
})
app.get('/posts',(req,res)=>{
    res.render("posts")
})
app.get('/user/account',(req,res)=>{
    res.render("userAccount")
})
app.get('/waccount',(req,res)=>{
    res.render('wroterAccount')
})
app.get('/dashboard',(req,res)=>{
    res.render("writerDashboard");
})
app.get('/favorite',(req,res)=>{
    res.render("userBlogs")
})
app.get('/writer',(req,res)=>{
    res.render("writer")
})
app.get("/login",(req,res)=>{
    res.render("login");
})
app.get("/user",(req,res)=>{
    res.render('user');
})
app.use((req,res)=>{
    res.render("404");
})
app.listen(PORT,async()=>{
    await db();
    console.log(`Server is running on port ${PORT}`);
});