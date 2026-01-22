import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import Writer from '../models/writer.js';

// Middleware for authenticating writers
export const authwriter = async (req, res, next) => {
  try {
    const token = req.headers.cookie.split("=")[1];
    console.log(token)
    if (!token) return res.render('Error',{"error":"Unauthrized"});
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decoded);
    const writer = await Writer.find({id:decoded._id});
    console.log(writer);
    
    if (!writer)
      return res.render('Error',{"error":"No match for writer"});    
    req.user = writer;
    
    
    next();
  } catch (error) {
    console.error(error);
    return res.render('Error',{"error":"Invalid Token"});
  }
};

// Middleware for authenticating general users
export const authenticate = async (req, res, next) => {
  
  try {
    const token = req.headers.cookie.split('=')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Please authenticate.' });
  }
};

// Token generator
export const generateToken = (user) => {
  return jwt.sign(
    { _id: user._id},
    process.env.SECRET_KEY, 
    { expiresIn: '1d' }
  );
};
 