import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import Writer from '../models/writer.js';

// Middleware for authenticating writers
export const authwriter = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Check role if necessary (optional parameter)
    if (decoded.role !== 'writer')
      return res.status(403).json({ message: 'Forbidden' });

    const writer = await Writer.findById(decoded._id);
    if (!writer)
      return res.status(404).json({ message: 'Writer not found' });

    req.user = writer;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Middleware for authenticating general users
export const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.token;
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
    { _id: user._id, role: user.role },
    process.env.SECRET_KEY,
    { expiresIn: '1d' }
  );
};
