import mongoose from "mongoose";


const connectDB=(url)=>{
    console.log("MongoDb connected as well")
    return mongoose.connect(url)
}

export default connectDB;