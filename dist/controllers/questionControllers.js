"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDeletedQuestions = exports.retrieveDeletedQuestions = exports.permanentDeleteQuestion = exports.deleteQuestion = exports.updateQuestion = exports.getQuestionById = exports.getQuestions = exports.createQuestion = void 0;
const Question_1 = __importDefault(require("../models/Question"));
const createQuestion = async (req, res) => {
    try {
        const { question, answer, options } = req.body;
        if (!question || !answer || !options) {
            res.status(400).json({ message: "Please provide all the details" });
            return;
        }
        const existingQuestion = await Question_1.default.find({ question });
        if (existingQuestion.length > 0) {
            res.status(400).json({ message: "Question already exists" });
            return;
        }
        const newQuestion = new Question_1.default({
            question,
            answer,
            options,
            createdAt: new Date(),
            updatedAt: new Date(),
            deleted: false
        });
        await newQuestion.save();
        res.status(201).json({ message: "created question succefully", newQuestion });
    }
    catch (error) {
        console.log("[ERROR WHILE CREATING QUESTION]: ", error);
    }
};
exports.createQuestion = createQuestion;
const getQuestions = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);
        const questions = await Question_1.default.find({ deleted: false })
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber);
        const totalQuestions = await Question_1.default.countDocuments();
        res.status(200).json({
            questions,
            totalPages: Math.ceil(totalQuestions / limitNumber),
            currentPage: pageNumber
        });
    }
    catch (error) {
        console.log("[ERROR WHILE FETCHING QUESTIONS]: ", error);
    }
};
exports.getQuestions = getQuestions;
//Error in the below function: question not found although it is present
const getQuestionById = async (req, res) => {
    try {
        const { id } = req.params;
        const question = await Question_1.default.findOne({ id, deleted: false });
        console.log(question);
        if (question === null) {
            res.status(404).json({ message: "Question not found" });
            return;
        }
        res.status(200).json({ question });
    }
    catch (error) {
        console.log("[ERROR WHILE FETCHING QUESTION]: ", error);
    }
};
exports.getQuestionById = getQuestionById;
const updateQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const { question, answer, options } = req.body;
        if (!question || !answer || !options) {
            res.status(400).json({ message: "Please provide all the details" });
            return;
        }
        const existingQuestion = await Question_1.default.findOne({ _id: id, deleted: false });
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
        console.log("[ERROR WHILE UPDATING QUESTION]: ", error);
    }
};
exports.updateQuestion = updateQuestion;
const deleteQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const existingQuestion = await Question_1.default.findByIdAndUpdate(id, { deleted: true }, { new: true });
        if (existingQuestion === null) {
            res.status(404).json({ message: "Question not found" });
            return;
        }
        res.status(200).json({ message: "Question deleted successfully" });
    }
    catch (error) {
        console.log("[ERROR WHILE DELETING QUESTION]: ", error);
    }
};
exports.deleteQuestion = deleteQuestion;
const permanentDeleteQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const existingQuestion = await Question_1.default.findByIdAndDelete(id);
        if (!existingQuestion) {
            res.status(404).json({ message: "Question not found" });
            return;
        }
        res.status(200).json({ message: "Question deleted permanently" });
    }
    catch (error) {
        console.log("[ERROR WHILE DELETING QUESTION]: ", error);
    }
};
exports.permanentDeleteQuestion = permanentDeleteQuestion;
//Error in the below function: question not found in deleted questions although it is present
const retrieveDeletedQuestions = async (req, res) => {
    try {
        const { id } = req.params;
        const existingQuestion = await Question_1.default.find({ id, deleted: true });
        console.log(existingQuestion);
        if (existingQuestion.length === 0) {
            res.status(404).json({ message: "Question not found in deleted questions" });
            return;
        }
        existingQuestion[0].deleted = false;
        res.status(200).json({ existingQuestion });
    }
    catch (error) {
        console.log("[ERROR WHILE FETCHING DELETED QUESTIONS]: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.retrieveDeletedQuestions = retrieveDeletedQuestions;
//Error in the below function: deleted questions are not fetched. Instead all questions are fetched
const getDeletedQuestions = async (req, res) => {
    try {
        throw new Error("Function not implemented");
        const { page = 1, limit = 10 } = req.query;
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);
        const deletedQuestions = await Question_1.default.find({ deleted: true })
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber);
        const totalDeletedQuestions = await Question_1.default.countDocuments({ deleted: true });
        res.status(200).json({
            deletedQuestions,
            totalPages: Math.ceil(totalDeletedQuestions / limitNumber),
            currentPage: pageNumber
        });
    }
    catch (error) {
        console.log("[ERROR WHILE FETCHING DELETED QUESTIONS]: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getDeletedQuestions = getDeletedQuestions;
