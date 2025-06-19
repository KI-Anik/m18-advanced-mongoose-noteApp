import express, { Request, Response } from 'express'
import { User } from '../models/user.model';
import { z } from 'zod';

export const usersRoutes = express.Router()

const createUserZodSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    age: z.number(),
    email: z.string(),
    password: z.string(),
    role: z.string().optional()
})

usersRoutes.post('/create', async (req: Request, res: Response) => {
    // const body = req.body;
    try {
        const body = await createUserZodSchema.parseAsync(req.body)
        const newUser = await User.create(body)
        res.send(newUser)
    } catch (error: any) {
        console.log('error', error);
        res.status(401).json({
            success: false,
            message : error.issues.map((i: z.ZodIssue) => i.message)
        })
    }
})
// get single
usersRoutes.get('/:userId', async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const singleUser = await User.findById(userId)
    // res.send(singleUser)
    res.status(201).json({
        message: 'Single User retrieved sucessfully',
        singleUser
    })
})
// get all
usersRoutes.get('/', async (req: Request, res: Response) => {
    const allUsers = await User.find()
    //  res.send(allUser)
    res.status(201).json({
        message: 'all users retrieved successfully',
        allUsers
    })
})

usersRoutes.patch('/update/:userId', async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const updatedBody = req.body
    const result = await User.findByIdAndUpdate(userId, updatedBody, { new: true })
    res.send(result)
})

usersRoutes.delete('/delete/:userId', async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const deletedUser = await User.findByIdAndDelete(userId)
    // res.send(deleteUser)
    res.status(201).json({
        message: 'deleted',
        deletedUser: deletedUser
    })
})