import express from "express";
const router=express.Router();
import { newBlog,singleBlog,myBlogs,editBlog } from "../controllers/blogController.js";
import { authwriter } from "../utils/auth.js";
router.post("/create",authwriter,newBlog);
router.get("/myblogs",authwriter,myBlogs);
router.post("/edit",authwriter,editBlog);
router.get("/:title",authwriter,singleBlog);
export default router;