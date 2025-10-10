import express from "express";
import { registerWriter,loginWriter,deleteWriter, } from "../controllers/writerControlller.js";
import {authwriter} from "../utils/auth.js"
const router=express.Router();
router.post('/register',registerWriter);
router.post("/login",loginWriter);
router.post("/delete",authwriter,deleteWriter)
export default router;