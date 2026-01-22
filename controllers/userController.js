import User from '../models/user.js';
import bcrypt from 'bcrypt';

// POST /user/register
import { generateToken } from '../utils/auth.js';
import { name } from 'ejs';
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
		const token= generateToken({_id:id,role:'user'})
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
		console.log(req.body) 
		if( !Email || !password ){
			return res.status(400).json("All fields are required");
		}
		const user=await User.findOne({email:Email});
		if(!user){
			return res.status(404).json("User not found!")
		}
		const validUser= await bcrypt.compare(password,user.password);
		if(!validUser){
			return res.status(500).json("Invalid Password!")
		}
		//Assign token with JWT
		const token= generateToken({_id:user.id,role:"user"})
		res.cookie("token",token,{
			httpOnly:true,
			secure:false,
			sameSite:'strict'
		});
		return res.send({
			"status":"success",
			"message":"logged in sucessfully!"
		});
	}catch(error){
		console.log(error)
		 res.status(500).json("Error logging in")
	}
}
export const deleteUser=async(req,res)=>{
	try{
		const name=req.user[0].name;
		const id=req.user[0].id;
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
        const temp=req.body;
		const val=temp.key();
        if(!temp){	
            return res.status(400).json("All fields are required");
        }
		switch(val){
			case name:
				
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
export const logout=async(req,res)=>{
	try{
		res.clearCookie('token');
		res.redirect('/login');
	}catch(error){
		res.render('Error',{'error':"Failed to logout!"})
	}
}