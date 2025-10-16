import User from '../models/user.js';
import bcrypt from 'bcrypt';

// POST /user/register
import { generateToken } from '../utils/auth.js';
export const registerUser = async (req, res) => {
	try {
		const {id, username,dob,gender,email, password } = req.body;
		console.log(req.body);
		if (!id || !username || !email || !dob || !gender || !password) {
			return res.status(400).send({"message":'All fields are required.'});
		}
		// Check if user already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(409).send({message:'User already registered with this email.'});
		}
		// Hash password
		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = new User({
			id:id,
			username:username,
			gender:gender,
			dob:dob,
			email:email,
			password: hashedPassword,
		});
		await newUser.save();
		const token= generateToken({_id:id,role:"user"})
		res.cookie("token",token,{
			httpOnly:true,
			secure:false,
			sameSite:'strict' 
		});
		return res.send({
			"status":"success",
			"message":"user registered successfully"
		})
	} catch (err) {
		return res.status(500).send({message:'Server error. Registration failed'});
	}
};
export const login=async(req,res)=>{
	try{
		const {Email,password}=req.body;
		if(!Email || !password){
			return res.status(400).json("All fields are required");
		}
		const user=await User.findOne(Email);
		if(!user){
			return res.status(404).json("User not found!")
		}
		const validUser= await bcrypt.compare(password,user.password);
		if(!validUser){
			return res.status(500).json("Invalid Password!")
		}
		//Assign token with JWT
		const token= generateToken({_id:user.id,role:"user"})
		console.log(token)
		res.cookie("token",token,{
			httpOnly:true,
			secure:Boolean(process.env.isDevelopment),
			sameSite:'strict'
		});
		return res.redirect('/posts');
	}catch(error){
		return res.status(500).json("Error logging in")
	}
}
export const deleteUser=async(req,res)=>{
	try{
		const name=req.user.name;
		const id=req.user.id;
		if(!name || !id){
			return res.status(400).json("Info not available")
		}
		await User.deleteOne(id);
	}catch(err){
		return res.status(500).json("Account Deletion Failed!");
	} 
}
export const updateUser=async(req,res)=>{
    try{
        const {newName}=req.body;
		const id=req.user.id;
        if(!id || !newName ){	
            return res.status(400).json("All fields are required");
        }
        const user=await User.findByIdAndUpdate(id,{name:newName},{new:true});
        if(!user){
            return res.status(404).json("User not found");
        }
        res.status(200).send({
			"status":"success",
			"message":"User updated successfully"});
    }catch(error){
        res.status(500).json("Error updating user");
    }
}