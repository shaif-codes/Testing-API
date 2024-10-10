import User from "../models/User"
import { Request, Response } from "express"
import { IUser, ISchemaUser } from "../interfaces/userInterface"


const createUser = async (req: Request<unknown, unknown, IUser>, res: Response): Promise<void> => {
    try {
        const { username, email, password }: IUser = req.body;

        if (!username || !email || !password) {
            res.status(400).json({ message: "Please provide all the details" });
            return;
        }

        // await User.createIndexes({ username: 1, email: 1 });
        const existingUser: ISchemaUser[] = await User.find({ $or: [{ username }, { email }] });
        // console.log(existingUser)
        
        if (existingUser.length > 0) {
            res.status(400).json({ message: "User already exists" });
            return;
        }

        const user: ISchemaUser = new User({
            username,
            email,
            password,
            createdAt: new Date(),
            updatedAt: new Date(),
            deleted: false
        })

        await user.save();
        res.status(201).json({message: "created user succefully", user });

    }
    catch (error) {
        console.log("[ERROR WHILE CREATING USER]: ", error)
    }
}

const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const pageNumber = parseInt(page as string, 10);
        const limitNumber = parseInt(limit as string, 10);

        const users = await User.find()
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber);

        const totalUsers = await User.countDocuments();

        res.status(200).json({
            users,
            totalPages: Math.ceil(totalUsers / limitNumber),
            currentPage: pageNumber
        });
    }
    catch (error) {
        console.log("[ERROR WHILE FETCHING USERS]: ", error);
    }
}

const getUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json({ user });
    }
    catch (error) {
        console.log("[ERROR WHILE FETCHING USER]: ", error);
    }
}

const updateUser = async (req: Request<unknown, unknown, IUser>, res: Response): Promise<void> => {
    try {
        const { id } = req.params as { id: string };
        const { username, email, password }: IUser = req.body;

        if (!username || !email || !password) {
            res.status(400).json({ message: "Please provide all the details" });
            return;
        }

        const user = await User.findByIdAndUpdate(id, {
            username,
            email,
            password,
            updatedAt: new Date()
        }, { new: true });

        res.status(200).json({message: "updated user details succesfully" , user });
    }
    catch (error) {
        console.log("[ERROR WHILE UPDATING USER]: ", error);
    }
}

const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        await User.findByIdAndUpdate(id, { deleted: true });
        res.status(200).json({ message: "User deleted successfully" });
    }
    catch (error) {
        console.log("[ERROR: WHILE DELETING USER]: ", error);
    }
}

const permanentDeleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: "User deleted permanently" });
    }
    catch (error) {
        console.log("[ERROR WHILE PERMANENTLY DELETING USER]: ", error);
    }
}

const retrieveUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        //checking if the user is already retrieved
        const existingUser: ISchemaUser[] | null = await User.find({id, deleted: true});
        if (!existingUser) {
            res.status(404).json({ message: "User not found in deleted Users" });
            return;
        }

        await User.findByIdAndUpdate(id, { deleted: false });
        res.status(200).json({ message: "User retrieved successfully" });
    }
    catch (error) {
        console.log("[ERROR WHILE RETRIEVING USER]: ", error);
    }
}

export { createUser, getUsers, getUser, updateUser, deleteUser, permanentDeleteUser, retrieveUser };