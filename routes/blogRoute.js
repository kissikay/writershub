import express from "express";
const router=express.Router();
import { newBlog,singleBlog,myBlogs,editBlog } from "../controllers/blogController.js";
import { authwriter } from "../utils/auth.js";
router.post("/newblog",newBlog);
router.post("/myblogs",myBlogs);
router.post("/edit",authwriter,editBlog);
router.post("/single",singleBlog);
export default router;