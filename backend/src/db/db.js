const mongoose=require('mongoose')

function connectDB(){
    mongoose.connect(process.env.MONGOOSE_URL)
    .then(()=>{
        console.log("connect to mongo db")
    })
}

module.exports=connectDB