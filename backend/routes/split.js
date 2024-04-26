import express, { response } from 'express';
import User from '../models/User.model.js';
import SettleExpense from '../models/Split.model.js';
const router = express.Router()
router.get('/',async(req,res)=>{
    const user =await User.findById(req.user)   
    const email = user.email
    const expense = await SettleExpense.find({createdBy:req.user})
    console.log(expense)
    res.json({expense}).status(200)
})
router.post('/', async (req, res) => {
    try {
      const { users, description, totalAmount } = req.body;
      console.log(req.body)
  
      // Find the user by ID from the token
      const createdBy = await User.findById(req.user);
  
      // Create an array of userExpenses
      const userExpenses = users.map(user => ({
        name: user.name,
        amount: parseFloat(user.amount)
      }));
  
      // Create the expense document
      const expense = await SettleExpense.create({
        description,
        totalAmount,
        createdBy: createdBy._id,
        userExpenses,
        isSettled: true
      });
  
      res.status(201).json({ success: true, expense });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Failed to create expense' });
    }
  });
export default router;
//6627b89cce7dcec58bb2f92f