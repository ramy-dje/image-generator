import * as dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import connectDb from './mongodb/connect.js';
import dalleRoutes from './routes/dalleRoutes.js';
import postRoutes from './routes/postRoutes.js';


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({limit:'50mb'}));

app.use('/api/v1/post',postRoutes);
app.use('/api/v1/dalle',dalleRoutes);

const mongoDbUrl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.0ryvums.mongodb.net/?retryWrites=true&w=majority`

const startServer =async ()=>{
    try{
        connectDb(mongoDbUrl)
        app.listen(3000,()=>console.log('server connected'))
    }catch(e){
        console.log(e)
    }
}
startServer();