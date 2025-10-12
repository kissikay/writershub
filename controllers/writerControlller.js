import Writer from '../models/writer.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/auth.js';
export const registerWriter = async (req, res) => {
	try {
		const {id, firstname, lastname, username, email, bio, password } = req.body;
		console.log(req.body);
		if ( !firstname || !lastname || !username || !email || !bio || !password) {
			return res.status(400).send('All fields are required.');
		}
		const existingWriter = await Writer.findOne({ email });
		if (existingWriter) {
			return res.status(409).send('Writer already registered with this email.');
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		const newWriter = new Writer({
			id:id,
			firstname:firstname,
			lastname:lastname,
			username:username,
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
		console.log("cookie success")
		res.send({"status":"success"})
	} catch (err) {
		console.error(err);
		return res.status(500).send('Server error.');
	}
};
export const loginWriter=async(req,res)=>{
	try{
		const {email,password}=req.body;
		console.log(password)
		if(!email || !password){
			return res.status(400).json("All fields are required")
		}
		const writer=await Writer.findOne({ email });
		if (!writer) {
            return res.status(400).json({"message":"Writer not found"});
        }
		const valid=await bcrypt.compare(password,writer.password)
		if(!valid){
			return res.status(400).json("Invalid Password");
			
		}
		//Assign token with JWT
        const token= generateToken({_id:writer.id,role:writer.role|"writer"})
		res.cookie("token",token,{
			httpOnly:true,
			secure:false,
			sameSite:'strict'
		});
		return res.redirect('/dashboard');
	}catch(error){
		console.log(error);
		return res.status(500).json("Login failed!")
	}
}
export const deleteWriter=async(req,res)=>{
	try{
		const name=req.user.name;
		const id=req.writer.id;
		if(!name || !id){
			return res.status(400).json("Info needed")
		}
		await Writer.findByIdAndDelete(id);
		return res.status(201).json("Writer account Deleted Successfully")
	}catch(error){
		console.log(error);
		return res.status(500).json("Error deleting user")
	}
}