import Writer from '../models/writer.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/auth.js';
export const registerWriter = async (req, res) => {
	try {
		const { id,name, email, bio, password } = req.body;
		if (!id||!name || !email || !bio || !password) {
			return res.status(400).send('All fields are required.');
		}
		const existingWriter = await Writer.findOne({ email });
		if (existingWriter) {
			return res.status(409).send('Writer already registered with this email.');
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		const newWriter = new Writer({
			id:id,
			name:name,
			email:email,
			bio:bio,
			password: hashedPassword,
		}); 
		await newWriter.save();
		//Assign token
		const token= generateToken({_id:id,role:"writer"})
		res.cookie("token",token,{
			httpOnly:true,
			secure:false,
			sameSite:'strict'
		});
		res.redirect('/dashboard');
	} catch (err) {
		res.status(500).send('Server error.');
	}
};
export const loginWriter=async(req,res)=>{
	try{
		const {email,password}=req.body;
		if(!email || !password){
			res.status(400).json("All fields are required")
		}
		const writer=await Writer.findOne(email);
		valid=await bcrypt.compare(password,writer.password)
		if(!valid){
			res.status(400).json("Invalid Password");
		}
		//Assign token with JWT
        const token= generateToken({_id:writer.id,role:writer.role|"writer"})
		res.cookie("token",token,{
			httpOnly:true,
			secure:false,
			sameSite:'strict'
		});
		res.redirect('/dashboard');
	}catch(error){
		console.log(error);
		res.status(500).json("Login failed!")
	}
}
export const deleteWriter=async(req,res)=>{
	try{
		const name=req.user.name;
		const id=req.writer.id;
		if(!name || !id){
			res.status(400).json("Info needed")
		}
		await Writer.findByIdAndDelete(id);
		res.status(201).json("Writer account Deleted Successfully")
	}catch(error){
		console.log(error);
		res.status(500).json("Error deleting user")
	}
}