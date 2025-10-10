import User from '../models/user.js';
import bcrypt from 'bcrypt';

// POST /user/create
export const registerUser = async (req, res) => {
	try {
		const {id, username, email, phone, password } = req.body;
		if (!id,!username || !email || !phone || !password) {
			return res.status(400).send('All fields are required.');
		}
		// Check if user already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(409).send('User already registered with this email.');
		}
		// Hash password
		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = new User({
			id:id,
			username:name,
			email:email,
			phone:phone,
			password: hashedPassword,
		});
		await newUser.save();
		token= generateToken({_id:id,role:"user"})
		res.cookie("token",token,{
			httpOnly:true,
			secure:false,
			sameSite:'strict'
		});
		res.redirect('/posts');
	} catch (err) {
		res.status(500).send('Server error. Registration failed');
	}
};
export const login=async(req,res)=>{
	try{
		const {Email,password}=req.body;
		if(!username || !password){
			res.status(400).json("All fields are required");
		}
		const user=await User.findOne(Email);
		if(!user){
			res.status(404).json("User not found!")
		}
		validUser= await bcrypt.compare(password,user.password);
		if(!validUser){
			res.status(500).json("Invalid Password!")
		}
		//Assign token with JWT
		token= generateToken({_id:id,role:"user"})
		res.cookie("token",token,{
			httpOnly:true,
			secure:false,
			sameSite:'strict'
		});
		res.redirect('/posts');
	}catch(error){
		res.status(500).json("Error logging in")
	}
}
export const deleteUser=async(req,res)=>{
	try{
		const name=req.user.name;
		const id=req.user.id;
		if(!name || !id){
			res.status(400).json("Info not available")
		}
		await user.deleteOne(id)
	}catch(err){
		res.status(500).json("Account Deletion Failed!")
		console.log(error)
	} 
}
export const updateUser=async(req,res)=>{
    try{
        const {userId,newName,newEmail}=req.body;
        if(!userId || !newName || !newEmail){
            return res.status(400).json("All fields are required");
        }
        const user=await User.findByIdAndUpdate(userId,{name:newName,email:newEmail},{new:true});
        if(!user){
            return res.status(404).json("User not found");
        }
        res.status(200).json("User updated successfully");
    }catch(error){
        console.log(error);
        res.status(500).json("Error updating user");
    }
}