import express, { json } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.model.js'; 
import nodemailer from 'nodemailer'
const router = express.Router();
router.post('/signup', async (req, res) => {
    router.use(json())
    const { email, password,name } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ email, password: hashedPassword,name:name });
        await user.save();
        await sendVerificationEmail(email,user._id);
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' });

        res.status(201).json({ message: 'User created',token:token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Signin route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        console.log("login  ")
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' });

        res.status(201).json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
async function sendVerificationEmail(email,_id) {
    
  
    try {
      const oneTimetoken = jwt.sign({ userId: _id },  process.env.JWT_SECRET_KEY, { expiresIn: '1h' }); // Replace with your user ID generation logic
        const verificationLink = `${process.env.FRONTEND_URL}/auth/checklogin?token=${oneTimetoken}`;
  
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // Adjust based on your SMTP server configuration
        auth: {
          user: 'abhinavbhar2004@gmail.com', // Replace with your actual email address
          pass: process.env.EMAIL_PASSWORD // Access email password securely using environment variables
        }
      });
        const mailOptions = {
        from: 'abhinavbhar2004@gmail.com', // Replace with your actual email address
        to: email,
        subject: 'Email Verification',
        text: '', // Include plain text for accessibility (optional)
        html: `
          <p>Click on the link below to verify your email address:</p>
          <a href="${verificationLink}">${verificationLink}</a>`
      };// Send the email using Nodemailer's sendMail method
      await transporter.sendMail(mailOptions);
  
      console.log('Email sent successfully!');
      return { message: 'Email sent successfully!' }; // Return a success message
  
    } catch (error) {
      console.error('Error sending email:', error.message);
      return { message: 'Failed to send email.', error: error.message }; // Return an error message
    }
  }
  router.post('/checklogin', async (req, res) => {
    const {token} = req.body;
    console.log(req.body)

    try {
        const decoded = jwt.verify(token,  process.env.JWT_SECRET_KEY);
        const user = await User.findOne({ _id: decoded.userId });
        if (!user) {
            throw new Error('User not found');
        }
        await user.updateOne({verified:true})
        const newToken = jwt.sign({ userId: user._id },  process.env.JWT_SECRET_KEY, { expiresIn: '5d' });
        console.log("success")

        res.json({ success: true, token: newToken }).status(200);
    } catch (error) {
        console.error('Token verification failed:', error.message);
        res.status(401).json({ success: false, message: 'Token verification failed' });
        console.log("error")
    }})
export default router;
