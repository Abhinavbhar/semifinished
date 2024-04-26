import mongoose from 'mongoose';




const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  jwtToken: {
    type: String,
    default: null
  },
  oneTimeToken: {
    token: {
      type: String,
      default: null
    },
    expiration: {
      type: Date,
      default: null
    }
  },
  name: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false
  },
  history: {
    type: String
  }
});

const User = mongoose.model('User', userSchema);

export default User;