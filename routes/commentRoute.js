import express from "express";
const router=express.Router();
import { authenticate } from "../utils/auth.js";
import { addComment, addlike, removeCommment } from "../controllers/commentController.js";
router.post("/like",authenticate,addlike);
router.post("/comment",authenticate,addComment)
router.post("/comment/delete",authenticate,removeCommment);
export default router;