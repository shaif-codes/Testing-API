import Question from "../models/Question";
import { Request, Response } from "express";
import { IQuestion, ISchemaQuestion } from "../interfaces/questionInterface";

const createQuestion = async (req: Request<unknown, unknown, IQuestion>, res: Response): Promise<void> => {
    try {
        const { question, answer, options }: IQuestion = req.body;

        if (!question || !answer || !options) {
            res.status(400).json({ message: "Please provide all the details" });
            return;
        }

        const existingQuestion: ISchemaQuestion[] = await Question.find({ question });

        if (existingQuestion.length > 0) {
            res.status(400).json({ message: "Question already exists" });
            return;
        }

        const newQuestion: ISchemaQuestion = new Question({
            question,
            answer,
            options,
            createdAt: new Date(),
            updatedAt: new Date(),
            deleted: false
        })

        await newQuestion.save();
        res.status(201).json({ message: "created question succefully", newQuestion });

    }
    catch (error) {
        console.log("[ERROR WHILE CREATING QUESTION]: ", error)
    }
}

const getQuestions = async (req: Request, res: Response): Promise<void> => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const pageNumber = parseInt(page as string, 10);
        const limitNumber = parseInt(limit as string, 10);

        const questions = await Question.find({ deleted: false })
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber);

        const totalQuestions = await Question.countDocuments();

        res.status(200).json({
            questions,
            totalPages: Math.ceil(totalQuestions / limitNumber),
            currentPage: pageNumber
        });
    }
    catch (error) {
        console.log("[ERROR WHILE FETCHING QUESTIONS]: ", error)
    }
}

//Error in the below function: question not found although it is present
const getQuestionById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const question: IQuestion | null = await Question.findOne({id, deleted: false});
        console.log(question)
        if (question === null) {
            res.status(404).json({ message: "Question not found" });
            return;
        }

        res.status(200).json({ question });
    }
    catch (error) {
        console.log("[ERROR WHILE FETCHING QUESTION]: ", error)
    }
}

const updateQuestion = async (req: Request<unknown, unknown, IQuestion>, res: Response): Promise<void> => {
    try {
        const { id } = req.params as { id: string };
        const { question, answer, options }: IQuestion = req.body;

        if (!question || !answer || !options) {
            res.status(400).json({ message: "Please provide all the details" });
            return;
        }

        const existingQuestion: ISchemaQuestion | null = await Question.findOne({ _id: id, deleted: false });

        if (!existingQuestion) {
            res.status(404).json({ message: "Question not found" });
            return;
        }

        existingQuestion.question = question;
        existingQuestion.answer = answer;
        existingQuestion.options = options;
        existingQuestion.updatedAt = new Date();

        await existingQuestion.save();
        res.status(200).json({ message: "Question updated successfully", existingQuestion });
    }
    catch (error) {
        console.log("[ERROR WHILE UPDATING QUESTION]: ", error)
    }
}

const deleteQuestion = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const existingQuestion: ISchemaQuestion | null = await Question.findByIdAndUpdate(id, { deleted: true }, { new: true });

        if (existingQuestion === null) {
            res.status(404).json({ message: "Question not found" });
            return;
        }

        res.status(200).json({ message: "Question deleted successfully" });

    }
    catch (error) {
        console.log("[ERROR WHILE DELETING QUESTION]: ", error)
    }
}

const permanentDeleteQuestion = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const existingQuestion: ISchemaQuestion | null = await Question.findByIdAndDelete(id);

        if (!existingQuestion) {
            res.status(404).json({ message: "Question not found" });
            return;
        }

        res.status(200).json({ message: "Question deleted permanently" });

    }
    catch (error) {
        console.log("[ERROR WHILE DELETING QUESTION]: ", error);
        
    }
}

//Error in the below function: question not found in deleted questions although it is present
const retrieveDeletedQuestions = async (req: Request, res: Response): Promise<void> => {
    try {
        const {id} = req.params;

        const existingQuestion: ISchemaQuestion[] | null = await Question.find({id, deleted: true});
        console.log(existingQuestion)

        if (existingQuestion.length === 0) {
            res.status(404).json({ message: "Question not found in deleted questions" });
            return;
        }

        existingQuestion[0].deleted = false;
        res.status(200).json({ existingQuestion });
    }
    catch (error) {
        console.log("[ERROR WHILE FETCHING DELETED QUESTIONS]: ", error)
        res.status(500).json({ message: "Internal server error" });
    }  
}


//Error in the below function: deleted questions are not fetched. Instead all questions are fetched
const getDeletedQuestions = async (req: Request, res: Response): Promise<void> => {
    try {
        throw new Error("Function not implemented");
        const { page = 1, limit = 10 } = req.query;
        const pageNumber = parseInt(page as string, 10);
        const limitNumber = parseInt(limit as string, 10);

        const deletedQuestions = await Question.find({ deleted: true })
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber);

        const totalDeletedQuestions = await Question.countDocuments({ deleted: true });

        res.status(200).json({
            deletedQuestions,
            totalPages: Math.ceil(totalDeletedQuestions / limitNumber),
            currentPage: pageNumber
        });

    }
    catch (error) {
        console.log("[ERROR WHILE FETCHING DELETED QUESTIONS]: ", error)
        res.status(500).json({ message: "Internal server error" });
    }
}

export { createQuestion, getQuestions, getQuestionById, updateQuestion, deleteQuestion, permanentDeleteQuestion, retrieveDeletedQuestions, getDeletedQuestions };