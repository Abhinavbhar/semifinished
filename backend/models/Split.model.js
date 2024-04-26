import mongoose from 'mongoose';

// Define the SettleExpense schema
const SettleExpenseSchema = new mongoose.Schema({
  users: [{
    email: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    }
  }],
  dateCreated: {
    type: Date,
    default: Date.now
  },
  isSettled: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: String, // Consider referencing the User schema for better data integrity
    required: true
  },
  description:String,
  totalAmount:Number,
});

// Create the SettleExpense model
const SettleExpense = mongoose.model('SettleExpense', SettleExpenseSchema);

export default SettleExpense;
