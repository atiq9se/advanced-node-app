
import express, { Request, Response } from "express";
import { User } from "../models/users.models";
import z, { parseAsync } from "zod";

import bcrypt from "bcryptjs"

export const usersRoutes = express.Router();

const createUserZodSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    age: z.number(),
    email: z.string(),
    password: z.string(),
    role: z.string().optional()
})

usersRoutes.post('/create-user', async (req: Request, res: Response)=>{
    try{
        // const body = await createUserZodSchema.parseAsync(req.body);
        const body = req.body;

        // const password = await bcrypt.hash(body.password, 10)
        // console.log(password);
        // body.password= password

        // const user = await User.create(body)

        // const user = new User(body)

        // const password= await user.hashPassword(body.password)
        // user.password = password

        // await user.save()

        //built in and custom static methods

        // const password = await User.hashPassword(body.password)
        // console.log(password)
        // body.password = password

        const user = await User.create(body)
        
        res.status(201).json({
            success: true,
            message: "user created successfully",
            user:user
        })
    } catch(error:any){
         console.log(error)
         res.status(201).json({
            success: false,
            message: error.message,
            error
        })
    }
})

usersRoutes.get('/', async (req: Request, res: Response)=>{
    const userEmail = req.query.email ? req.query.email: ""
    let users = []

    if(userEmail){
        users = await User.find({email: userEmail})
    }else{
        users = await User.find()
    }

    //sorting
    users = await User.find().sort({ "email": "asc"})
    users = await User.find().sort({ "email": "ascending"})
    users = await User.find().sort({ "email": "desc"})
    users = await User.find().sort({ "email": "descending"})
    users = await User.find().sort({ "email": 1})
    users = await User.find().sort({ "email": -1})

    //skipping
    users = await User.find().skip(10)

    //limiting
    users = await User.find().limit(2)

    
    
    res.status(201).json({
        success: true,
        message: "user created successfully",
        user
    })
})

usersRoutes.get('/:userId', async (req: Request, res: Response)=>{
    const userId = req.params.userId
    const user = await User.findById(userId)
    
    res.status(201).json({
        success: true,
        message: "user created successfully",
        user
    })
})

usersRoutes.patch('/:userId', async (req: Request, res: Response)=>{
    const userId = req.params.userId
    const updateBody = req.body;
    const user = await User.findByIdAndUpdate(userId, updateBody, {new:true})
    // const user1 = await user.findOneAndUpdate({_id: userId}, updateBody, {new:true})
    // const user2 = await user.updateOne({_id: userId}, updateBody, {new:true})
    
    res.status(201).json({
        success: true,
        message: "user update successfully",
        user
    })
})

usersRoutes.delete('/:userId', async (req: Request, res: Response)=>{
    const userId = req.params.userId
    const updateBody = req.body;
    const user = await User.findOneAndDelete({_id: userId})
    // const user1 = await user.findOneAndDelete({_id: userId})
    // const user = await User.findByIdAndDelete(userId)
    // const user2 = await user.deleteOne({_id: userId})
    
    res.status(201).json({
        success: true,
        message: "user delete successfully",
        user
    })
})