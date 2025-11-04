const express=require('express')
const postRoute = require('./routes/post.route')
const cors=require('cors')


const app=express()
app.use(
  cors({
    origin: "http://localhost:5173", // your React app URL     
  })
);
app.use(express.json())
app.use('/api/post',postRoute)

module.exports=app