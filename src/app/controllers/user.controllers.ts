
import express, { Request, Response } from "express";
import { User } from "../models/users.models";


export const usersRoutes = express.Router();

usersRoutes.post('/create-user', async (req: Request, res: Response)=>{
    const body = req.body
    
    // usersRoutesroach -1  of creating a data
    // const myuser = new user({
    //     title: "Learning Mongoose",
    //     content: "i am learning mongooose"
    // })

    // await myuser.save()

    const user = await User.create(body)
    
    res.status(201).json({
        success: true,
        message: "user created successfully",
        user
    })
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