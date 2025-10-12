import jwt from 'jsonwebtoken'
import User from '../models/user.js';
import Writer from '../models/writer.js';
export const authwriter=async (req,res,next)=>{
  try{
      const token=req.cookies.token;
      if(!token) return res.status.json({"message":"Unauthorised"});
      const decoded= jwt.verify(token,process.env.SECRET_KEY)
      if(role&&decoded.role!==role) return res.status(401).json({"message":"Forbidden"});
        const writer=Writer.findById(decoded._id);
        req.user=writer;
      next();
  }catch(error){
    console.log(error)
    return res.status(401).json({"message":"invalid token"});
  }
}
export const authenticate = async (req, res, next) => {
  try {

    const token = req.cookies.token;
    if(!token) return res.status(401).json({'message':"Unauthorised"});
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Please authenticate.' });
  }
};
export const generateToken = (user) => {
  return jwt.sign({ _id: user._id, role: user.role }, process.env.SECRET_KEY, { expiresIn: '1d' });
};

