const postModel = require("../models/post.model")
const captionGenerator = require("../services/ai.service")
const uploadImage = require("../services/storage.service")


async function postController(req,res){
    const file=req.file
     const base64Image=new Buffer.from(file.buffer).toString('base64')
     const caption=await captionGenerator(base64Image)
    
     const filedata= await uploadImage(file)
     const post=await postModel.create({
        image:filedata.url,
        caption:caption,
     })
     res.status(201).json({
        message:"post created",
        post
     })
}


module.exports=postController
