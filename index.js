import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import {mongoose} from 'mongoose'
import bodyParser from 'body-parser'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import Exercise from './models/exercise.js';
import User from './models/user.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express()
dotenv.config()

const port = process.env.PORT || 3000;

const connect = () => {
  try{
    mongoose.connect(process.env.URI,{
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('connected to Database')
  }catch(err){
    console.log('error connecting to Database'+err.message)
  }
}

connect();

app.use(cors())
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static('public'))



app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.post('/api/users',async (req, res) => {
  try{
    let user = await User.findOne({username: req.body.username})
    if(user){
      res.json({
        username: user.username,
        _id: user._id
      })
    } else {
      user = new User({
        username: req.body.username
      })
      user.save();
      res.json({
        username: user.username,
        _id: user._id
      })
    }
  } catch(err){
    res.status(400).json('server error' + err.message)
  }
})






const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
