import mongoose, { connect, mongo } from "mongoose";

const connectDb = (url)=>{
    mongoose.set('strictQuery',true);
    mongoose.connect(url)
    .then(()=>console.log('db connected'))
    .catch((err)=>console.log(err))
}

export default connectDb ;