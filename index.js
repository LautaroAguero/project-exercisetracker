import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import {mongoose} from 'mongoose'
import bodyParser from 'body-parser'


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
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});





const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
