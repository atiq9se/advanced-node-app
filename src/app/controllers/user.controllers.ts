
import express, { Request, Response } from "express";
import { User } from "../models/users.models";
import z, { parseAsync } from "zod";




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
        console.log(body, "zod body")

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
    const user = await User.find()
    
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
    const user = await User.findByIdAndDelete(userId)
    // const user1 = await user.findOneAndDelete({_id: userId})
    // const user2 = await user.deleteOne({_id: userId})
    
    res.status(201).json({
        success: true,
        message: "user delete successfully",
        user
    })
})