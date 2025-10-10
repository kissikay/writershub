import express from 'express';
import { registerUser, updateUser,deleteUser,login} from '../controllers/userController.js';
import {authenticate} from '../utils/auth.js'
const router=express.Router();
router.post('/register',registerUser);
router.post('/login',login);
router.post('/updateUser',authenticate,updateUser);
router.post('/deleteUser',authenticate,deleteUser);
export default router;