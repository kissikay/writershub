import express from "express";
const router=express.Router();
import { authenticate } from "../utils/auth.js";
import { addComment, addlike, removeCommment, removeLike } from "../controllers/commentController.js";
router.post("/like",authenticate,addlike);
router.post("/removelike",authenticate,removeLike)
router.post("/comment",authenticate,addComment)
router.post("/deletecomment",authenticate,removeCommment);
export default router;