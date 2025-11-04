const express=require('express')
const postRoute = require('./routes/post.route')
const cors=require('cors')


const app=express()
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://ai-caption-t2u1.onrender.com'],    
  })
);
app.use(express.json())
app.use('/api/post',postRoute)

module.exports=app
