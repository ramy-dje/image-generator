import express from "express";
import dotenv from 'dotenv';
import {v2 as cloudinary} from 'cloudinary';
import Post from '../models/post.js';
import {Configuration,OpenAIApi} from 'openai';

dotenv.config();
const router = express.Router();
const configuration = new Configuration({
    apiKey : process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

router.route('/').get((req,res)=>{
    res.send('hello negga')
})
router.route('/').post(async (req,res)=>{
    try{
        const {prompt} = req.body ; 
        const aiResponse =await openai.createImage({
            prompt,
            n:1,
            response_format:'b64_json',
            size:'512x512'
        })
        const image = aiResponse.data.data[0].b64_json;
        res.json({photo : image});
    }catch(e){
        console.log(e)
    }
})
export default router ;