// index.js
import express from 'express';
import bodyParser from 'body-parser';
import connect from './db/index.js';
import authentication from './routes/login.route.js';
import cors from 'cors';
import authMiddleware from './middleware.js';
import checklogin from './routes/checklogin.js'
import split from './routes/split.js'
const app = express();
app.use(cors())
app.use(bodyParser.json());
 connect();//to connect database 
 
app.use('/auth',authentication)
app.use(authMiddleware)
console.log("hello")
app.use('/checklogin',checklogin)
app.use('/split',split)
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
