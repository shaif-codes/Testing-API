import Test from "../models/Test";
import { Request, Response } from "express";
import { ITest, ISchemaTest } from "../interfaces/testInterface";

const createTest = async (req: Request<unknown, unknown, ITest>, res: Response): Promise<void> => {
    try {
        const { name, description, questions }: ITest = req.body;

        if (!name || !description || !questions) {
            res.status(400).json({ message: "Please provide all the details" });
            return;
        }

        const existingTest: ISchemaTest[] = await Test.find({ name });

        if (existingTest.length > 0) {
            res.status(400).json({ message: "Test already exists" });
            return;
        }

        const newTest: ISchemaTest = new Test({
            name,
            description,
            questions,
            createdAt: new Date(),
            updatedAt: new Date(),
            deleted: false
        })

        await newTest.save();
        res.status(201).json({ message: "created test succefully", newTest });

    }
    catch (error) {
        console.log("[ERROR WHILE CREATING TEST]: ", error)
    }
}

const getTests = async (req: Request, res: Response): Promise<void> => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const pageNumber = parseInt(page as string, 10);
        const limitNumber = parseInt(limit as string, 10);

        const tests = await Test.find()
            // .populate('question')
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber);

        const totalTests = await Test.countDocuments();

        res.status(200).json({
            tests,
            totalPages: Math.ceil(totalTests / limitNumber),
            currentPage: pageNumber
        });
    }
    catch (error) {
        console.log("[ERROR WHILE FETCHING TESTS]: ", error)
    }
}


const getTestById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const test = await Test.findById(id).populate('questions', {answer: 0});

        if (!test) {
            res.status(404).json({ message: "Test not found" });
            return;
        }

        res.status(200).json({ test });
    }
    catch (error) {
        console.log("[ERROR WHILE FETCHING TEST BY ID]: ", error)
    }
}

const updateTest = async (req: Request<unknown, unknown, ITest>, res: Response): Promise<void> => {
    try {
        const { id } = req.params as { id: string };
        const { name, description, questions }: ITest = req.body;

        const test = await Test.findById(id);

        if (!test) {
            res.status(404).json({ message: "Test not found" });
            return;
        }

        test.name = name;
        test.description = description;
        test.questions = Array.isArray(questions) ? questions : [questions];
        test.updatedAt = new Date();

        await test.save();
        res.status(200).json({ message: "Test updated successfully", test });
    }
    catch (error) {
        console.log("[ERROR WHILE UPDATING TEST]: ", error)
    }
}

const deleteTest = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        await Test.findByIdAndUpdate(id, { deleted: true });
        res.status(200).json({ message: "Test deleted successfully" });
    }
    catch (error) {
        console.log("[ERROR WHILE DELETING TEST]: ", error)
    }
}

const permanentDeleteTest = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        await Test.findByIdAndDelete(id);
        res.status(200).json({ message: "Test deleted permanently" });
    }
    catch (error) {
        console.log("[ERROR WHILE PERMANENTLY DELETING TEST]: ", error)
    }
}

const retrieveDeletedTests = async (req: Request, res: Response): Promise<void> => {
    try {
        const tests = await Test.find({ deleted: true });

        res.status(200).json({ tests });
    }
    catch (error) {
        console.log("[ERROR WHILE RETRIEVING DELETED TESTS]: ", error)
    }
}

const getDeletedTests = async (req: Request, res: Response): Promise<void> => {
    try {
        const tests = await Test.find({ deleted: true });

        res.status(200).json({ tests });
    }
    catch (error) {
        console.log("[ERROR WHILE FETCHING DELETED TESTS]: ", error)
    }
}


export { createTest, getTests, getTestById, updateTest, deleteTest, permanentDeleteTest, retrieveDeletedTests, getDeletedTests };