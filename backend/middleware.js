import jwt from 'jsonwebtoken';
import express from 'express';
import User from './models/User.model.js';
const Router = express.Router();
const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];

  console.log("hello")
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Missing token' });
  }
  try {
    // Verify the token using your JWT secret (replace 'secret' with your actual secret)
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = User.findById(decoded.userId)
    console.log("hello",user)
    req.user = decoded.userId;

    next(); // Continue processing the request if token is valid
  } catch (error) {
    // Handle invalid token errors
    if (error.name === 'JsonWebTokenError') {
      console.log(error)
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    } else {
      console.log(error)
      // Handle other errors (e.g., expired token)
      return res.status(500).json({ message: 'Server error' });
    }
  }
};

export default authMiddleware;