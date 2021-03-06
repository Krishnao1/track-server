require('./models/User')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser=require('body-parser')
const authRoutes= require('./routes/authRoutes')
const requireAuth = require('./middlewares/requireAuth');


const app = express();
// console.log(app)

app.use(bodyParser.json())
app.use(authRoutes);

const mongoUri='mongodb+srv://admin:Password@cluster0.kiaji.mongodb.net/<dbname>?retryWrites=true&w=majority'

mongoose.connect(mongoUri,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected',()=>{
    console.log('connected to mongo instancd')
})

mongoose.connection.on('error',(err)=>{
   console.log('connection failed ',err)
})

app.get('/',requireAuth,(req,res)=>{
 res.send(`your email :${req.user.email}`);
})

app.listen(3000,()=>{
    console.log('listening on port 3000')
})

