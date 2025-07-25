import express, { Application, Request, Response } from 'express';
import { notesRoutes } from './app/controllers/notes.controllers';
import { usersRoutes } from './app/controllers/user.controllers';

const app: Application = express();

app.use(express.json())

app.use('/notes', notesRoutes)
app.use('/users', usersRoutes)



app.get('/', (req: Request, res: Response)=>{
    res.send('welcome to note app')
})

export default app;