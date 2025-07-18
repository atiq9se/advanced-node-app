
import express, { Request, Response } from "express";
import { Note } from "../models/notes.models";

export const notesRoutes = express.Router();

notesRoutes.post('/create-note', async (req: Request, res: Response)=>{
    const body = req.body
    
    // notesRoutesroach -1  of creating a data
    // const myNote = new Note({
    //     title: "Learning Mongoose",
    //     content: "i am learning mongooose"
    // })

    // await myNote.save()

    const note = await Note.create(body)
    
    res.status(201).json({
        success: true,
        message: "Note created successfully",
        note
    })
})

notesRoutes.get('/', async (req: Request, res: Response)=>{
    const notes = await Note.find()
    
    res.status(201).json({
        success: true,
        message: "Note created successfully",
        notes
    })
})

notesRoutes.get('/:noteId', async (req: Request, res: Response)=>{
    const noteId = req.params.noteId
    const note = await Note.findById(noteId)
    
    res.status(201).json({
        success: true,
        message: "Note created successfully",
        note
    })
})

notesRoutes.patch('/:noteId', async (req: Request, res: Response)=>{
    const noteId = req.params.noteId
    const updateBody = req.body;
    const note = await Note.findByIdAndUpdate(noteId, updateBody, {new:true})
    // const note1 = await Note.findOneAndUpdate({_id: noteId}, updateBody, {new:true})
    // const note2 = await Note.updateOne({_id: noteId}, updateBody, {new:true})
    
    res.status(201).json({
        success: true,
        message: "Note update successfully",
        note
    })
})

notesRoutes.delete('/:noteId', async (req: Request, res: Response)=>{
    const noteId = req.params.noteId
    const updateBody = req.body;
    const note = await Note.findByIdAndDelete(noteId)
    // const note1 = await Note.findOneAndDelete({_id: noteId})
    // const note2 = await Note.deleteOne({_id: noteId})
    
    res.status(201).json({
        success: true,
        message: "Note delete successfully",
        note
    })
})