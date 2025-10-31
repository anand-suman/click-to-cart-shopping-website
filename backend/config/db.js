const mongoose = require("mongoose")


async function connectDB(){
    try{
        const uri = process.env.MONGODB_URI || process.env.MONGODB_URL
        if(!uri){
            throw new Error("Missing MONGODB_URI (or MONGODB_URL) in environment")
        }
        await mongoose.connect(uri)
    }catch(err){
        console.log(err)
    }
}

module.exports = connectDB