"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSubmission = exports.getSubmissionById = exports.getSubmissions = exports.createSubmission = void 0;
const Submission_1 = __importDefault(require("../models/Submission"));
const createSubmission = async (req, res) => {
    try {
        const { user, testId, response } = req.body;
        if (!user || !testId || !response) {
            res.status(400).json({ message: "Please provide all the details" });
            return;
        }
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
