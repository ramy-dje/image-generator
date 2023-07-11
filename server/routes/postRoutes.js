import express from "express";
import dotenv from 'dotenv';
import {v2 as cloudinary} from 'cloudinary';
import Post from '../models/post.js';
import {Configuration,OpenAIApi} from 'openai';

dotenv.config();
const router = express.Router();

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret :process.env.CLOUDINARY_API_SECRET
})

router.route('/').get(async (req,res)=>{
    try{
        const response =await Post.find();
        res.json({success : true,data:response});
    }catch(e){
        console.log(e);
        res.json({success : false,data:e});
    }
})
router.route('/').post(async (req,res)=>{
    try{
        const { name,prompt,photo } = req.body ;
         //cloudinary.uploader.upload(photo).then((res)=>console.log(res.url)).catch((e)=>console.log(e));
        const newPost = await Post.create({
            name,
            prompt,
            photo:photo
        })
        res.json({success : true,data : newPost});
    }catch(e){
        console.log(e);
        res.json({success : false,message : e});
    }
})
export default router ;