import express from 'express';
import User from '../models/User.model.js';
const router = express.Router()
router.get('/',async(req,res)=>{
    const user =await User.findById(req.user)
    console.log(user)
    console.log()
    res.json({success:true,name:user.name,email:user.email}).status(200)

})
export default router;