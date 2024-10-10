import { Request, Response } from "express";
import { ISubmission, ISchemaSubmission, IPopulatedSubmission } from "../interfaces/submissionInterface";
import Submission from "../models/Submission";
import User from "../models/User";
import Test from "../models/Test";
import { ISchemaQuestion } from "../interfaces/questionInterface";
import { Scheduler } from "timers/promises";
import { Schema } from "mongoose";


const createSubmission = async (req: Request<unknown, unknown, ISubmission>, res: Response): Promise<void> => {
    try {
        const { user, testId, response }: ISubmission = req.body;
        // console.log("user: ", user, "testId: ", testId, "response: ", response);
        if (!user || !testId || !response) {
            res.status(400).json({ message: "Please provide all the details" });
            return;
        }

        //check if user exists
        const userExists = await User.findById(user);

        if (!userExists) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        //check if the test exists
        const testExists = await Test.findById(testId);

        if (!testExists) {
            res.status(404).json({ message: "Test not found" });
            return;
        }

        //check if the submission already
        const existingSubmission: ISchemaSubmission[] = await Submission.find({ user, testId });

        if (existingSubmission.length > 0) {
            res.status(400).json({ message: "Submission already exists" });
            return;
        }

        //check if the response is valid
        // const questions = testExists.questions;
        
        // questions.forEach((question: Schema.Types.ObjectId) => {
        //     const answer = response.find((answer) => answer.question === question);
        //     if (!answer) {
        //         res.status(400).json({ message: "Please provide resoponse of all Test Questions" });
        //         return;
        //     }
        // });


        const newSubmission: ISchemaSubmission = new Submission({
            user,
            testId,
            response,
            createdAt: new Date(),
            updatedAt: new Date(),
            deleted: false
        })

        await newSubmission.save();
        res.status(201).json({ message: "created submission succefully", newSubmission });

    }
    catch (error) {
        console.log("[ERROR WHILE CREATING SUBMISSION]: ", error)
    }
}


const getSubmissions = async (req: Request, res: Response): Promise<void> => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const pageNumber = parseInt(page as string, 10);
        const limitNumber = parseInt(limit as string, 10);

        const submissions = await Submission.find()
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber);

        const totalSubmissions = await Submission.countDocuments();

        res.status(200).json({
            submissions,
            totalPages: Math.ceil(totalSubmissions / limitNumber),
            currentPage: pageNumber
        });
    }
    catch (error) {
        console.log("[ERROR WHILE FETCHING SUBMISSIONS]: ", error)
    }
}

const getSubmissionById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const submission = await Submission.findById(id);
        res.status(200).json({ submission });
    }
    catch (error) {
        console.log("[ERROR WHILE FETCHING SUBMISSION]: ", error);
    }
}

const updateSubmission = async (req: Request<unknown, unknown, ISubmission>, res: Response): Promise<void> => {
    try {
        const { id } = req.params as { id: string };
        const { user, testId, response }: ISubmission = req.body;

        if (!user || !testId || !response) {
            res.status(400).json({ message: "Please provide all the details" });
            return;
        }

        const updatedSubmission = await Submission.findByIdAndUpdate(id, {
            user,
            testId,
            response,
            updatedAt: new Date()
        }, { new: true });

        res.status(200).json({ message: "updated submission succefully", updatedSubmission });
    }

    catch (error) {
        console.log("[ERROR WHILE UPDATING SUBMISSION]: ", error)
    }
}

const deleteSubmission = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const submission = await Submission.findById(id);

        if (!submission) {
            res.status(404).json({ message: "Submission not found" });
            return;
        }

        await Submission.findByIdAndUpdate(id, { deleted: true });
        res.status(200).json({ message: "Submission deleted successfully" });
    }
    catch (error) {
        console.log("[ERROR WHILE DELETING SUBMISSION]: ", error)
    }
}

const permanentDeleteSubmission = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const submission = await Submission.findById
        if (!submission) {
            res.status(404).json({ message: "Submission not found" });
            return;
        }
        
        await Submission.findByIdAndDelete(id);
        res.status(200).json({ message: "Submission deleted permanently" });
    }
    catch (error) {
        console.log("[ERROR WHILE DELETING SUBMISSION]: ", error)
    }
}

const retrieveDeletedSubmissions = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const submission = await Submission.findById
        if (!submission) {
            res.status(404).json({ message: "Submission not found" });
            return;
        }
        
        await Submission.findByIdAndDelete(id);
        res.status(200).json({ message: "Submission deleted permanently" });
    }
    catch (error) {
        console.log("[ERROR WHILE DELETING SUBMISSION]: ", error)
    }
}

const evaluteSubmission = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const submission = await Submission.findById(id).populate<IPopulatedSubmission>("response.question");
        if (!submission) {
            res.status(404).json({ message: "Submission not found" });
            return;
        }
        let score = 0;
        submission.response.forEach((answer) => {
            if (answer.answer && answer.question.answer === answer.answer) {
                score++;
            }
        });

        submission.score = score;
        submission.evaluatedAt = new Date();
        await submission.save();
        res.status(200).json({ message: "Submission evaluated successfully", submission });

    }
    catch (error) {
        console.log("[ERROR WHILE EVALUATING SUBMISSION]: ", error)
    }
}






export { createSubmission, getSubmissions, getSubmissionById, updateSubmission, deleteSubmission, permanentDeleteSubmission, retrieveDeletedSubmissions, evaluteSubmission }



