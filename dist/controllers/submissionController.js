"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluteSubmission = exports.retrieveDeletedSubmissions = exports.permanentDeleteSubmission = exports.deleteSubmission = exports.updateSubmission = exports.getSubmissionById = exports.getSubmissions = exports.createSubmission = void 0;
const Submission_1 = __importDefault(require("../models/Submission"));
const User_1 = __importDefault(require("../models/User"));
const Test_1 = __importDefault(require("../models/Test"));
const createSubmission = async (req, res) => {
    try {
        const { user, testId, response } = req.body;
        // console.log("user: ", user, "testId: ", testId, "response: ", response);
        if (!user || !testId || !response) {
            res.status(400).json({ message: "Please provide all the details" });
            return;
        }
        //check if user exists
        const userExists = await User_1.default.findById(user);
        if (!userExists) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        //check if the test exists
        const testExists = await Test_1.default.findById(testId);
        if (!testExists) {
            res.status(404).json({ message: "Test not found" });
            return;
        }
        //check if the submission already
        const existingSubmission = await Submission_1.default.find({ user, testId });
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
        const newSubmission = new Submission_1.default({
            user,
            testId,
            response,
            createdAt: new Date(),
            updatedAt: new Date(),
            deleted: false
        });
        await newSubmission.save();
        res.status(201).json({ message: "created submission succefully", newSubmission });
    }
    catch (error) {
        console.log("[ERROR WHILE CREATING SUBMISSION]: ", error);
    }
};
exports.createSubmission = createSubmission;
const getSubmissions = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);
        const submissions = await Submission_1.default.find()
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber);
        const totalSubmissions = await Submission_1.default.countDocuments();
        res.status(200).json({
            submissions,
            totalPages: Math.ceil(totalSubmissions / limitNumber),
            currentPage: pageNumber
        });
    }
    catch (error) {
        console.log("[ERROR WHILE FETCHING SUBMISSIONS]: ", error);
    }
};
exports.getSubmissions = getSubmissions;
const getSubmissionById = async (req, res) => {
    try {
        const { id } = req.params;
        const submission = await Submission_1.default.findById(id);
        res.status(200).json({ submission });
    }
    catch (error) {
        console.log("[ERROR WHILE FETCHING SUBMISSION]: ", error);
    }
};
exports.getSubmissionById = getSubmissionById;
const updateSubmission = async (req, res) => {
    try {
        const { id } = req.params;
        const { user, testId, response } = req.body;
        if (!user || !testId || !response) {
            res.status(400).json({ message: "Please provide all the details" });
            return;
        }
        const updatedSubmission = await Submission_1.default.findByIdAndUpdate(id, {
            user,
            testId,
            response,
            updatedAt: new Date()
        }, { new: true });
        res.status(200).json({ message: "updated submission succefully", updatedSubmission });
    }
    catch (error) {
        console.log("[ERROR WHILE UPDATING SUBMISSION]: ", error);
    }
};
exports.updateSubmission = updateSubmission;
const deleteSubmission = async (req, res) => {
    try {
        const { id } = req.params;
        const submission = await Submission_1.default.findById(id);
        if (!submission) {
            res.status(404).json({ message: "Submission not found" });
            return;
        }
        await Submission_1.default.findByIdAndUpdate(id, { deleted: true });
        res.status(200).json({ message: "Submission deleted successfully" });
    }
    catch (error) {
        console.log("[ERROR WHILE DELETING SUBMISSION]: ", error);
    }
};
exports.deleteSubmission = deleteSubmission;
const permanentDeleteSubmission = async (req, res) => {
    try {
        const { id } = req.params;
        const submission = await Submission_1.default.findById;
        if (!submission) {
            res.status(404).json({ message: "Submission not found" });
            return;
        }
        await Submission_1.default.findByIdAndDelete(id);
        res.status(200).json({ message: "Submission deleted permanently" });
    }
    catch (error) {
        console.log("[ERROR WHILE DELETING SUBMISSION]: ", error);
    }
};
exports.permanentDeleteSubmission = permanentDeleteSubmission;
const retrieveDeletedSubmissions = async (req, res) => {
    try {
        const { id } = req.params;
        const submission = await Submission_1.default.findById;
        if (!submission) {
            res.status(404).json({ message: "Submission not found" });
            return;
        }
        await Submission_1.default.findByIdAndDelete(id);
        res.status(200).json({ message: "Submission deleted permanently" });
    }
    catch (error) {
        console.log("[ERROR WHILE DELETING SUBMISSION]: ", error);
    }
};
exports.retrieveDeletedSubmissions = retrieveDeletedSubmissions;
const evaluteSubmission = async (req, res) => {
    try {
        const { id } = req.params;
        const submission = await Submission_1.default.findById(id).populate("response.question");
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
        console.log("[ERROR WHILE EVALUATING SUBMISSION]: ", error);
    }
};
exports.evaluteSubmission = evaluteSubmission;
