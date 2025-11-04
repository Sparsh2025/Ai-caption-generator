const express=require('express')
const multer=require('multer')
const postController = require('../controllers/post.controller')
const route=express.Router()

const upload=multer({storage:multer.memoryStorage()})

route.post('/',upload.single('image'),postController)


module.exports=route