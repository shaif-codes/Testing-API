"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDeletedTests = exports.retrieveDeletedTests = exports.permanentDeleteTest = exports.deleteTest = exports.updateTest = exports.getTestById = exports.getTests = exports.createTest = void 0;
const Test_1 = __importDefault(require("../models/Test"));
const createTest = async (req, res) => {
    try {
        const { name, description, questions } = req.body;
        if (!name || !description || !questions) {
            res.status(400).json({ message: "Please provide all the details" });
            return;
        }
        const existingTest = await Test_1.default.find({ name });
        if (existingTest.length > 0) {
            res.status(400).json({ message: "Test already exists" });
            return;
        }
        const newTest = new Test_1.default({
            name,
            description,
            questions,
            createdAt: new Date(),
            updatedAt: new Date(),
            deleted: false
        });
        await newTest.save();
        res.status(201).json({ message: "created test succefully", newTest });
    }
    catch (error) {
        console.log("[ERROR WHILE CREATING TEST]: ", error);
    }
};
exports.createTest = createTest;
const getTests = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);
        const tests = await Test_1.default.find()
            // .populate('question')
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber);
        const totalTests = await Test_1.default.countDocuments();
        res.status(200).json({
            tests,
            totalPages: Math.ceil(totalTests / limitNumber),
            currentPage: pageNumber
        });
    }
    catch (error) {
        console.log("[ERROR WHILE FETCHING TESTS]: ", error);
    }
};
exports.getTests = getTests;
const getTestById = async (req, res) => {
    try {
        const { id } = req.params;
        const test = await Test_1.default.findById(id).populate('questions', { answer: 0 });
        if (!test) {
            res.status(404).json({ message: "Test not found" });
            return;
        }
        res.status(200).json({ test });
    }
    catch (error) {
        console.log("[ERROR WHILE FETCHING TEST BY ID]: ", error);
    }
};
exports.getTestById = getTestById;
const updateTest = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, questions } = req.body;
        const test = await Test_1.default.findById(id);
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
        console.log("[ERROR WHILE UPDATING TEST]: ", error);
    }
};
exports.updateTest = updateTest;
const deleteTest = async (req, res) => {
    try {
        const { id } = req.params;
        await Test_1.default.findByIdAndUpdate(id, { deleted: true });
        res.status(200).json({ message: "Test deleted successfully" });
    }
    catch (error) {
        console.log("[ERROR WHILE DELETING TEST]: ", error);
    }
};
exports.deleteTest = deleteTest;
const permanentDeleteTest = async (req, res) => {
    try {
        const { id } = req.params;
        await Test_1.default.findByIdAndDelete(id);
        res.status(200).json({ message: "Test deleted permanently" });
    }
    catch (error) {
        console.log("[ERROR WHILE PERMANENTLY DELETING TEST]: ", error);
    }
};
exports.permanentDeleteTest = permanentDeleteTest;
const retrieveDeletedTests = async (req, res) => {
    try {
        const tests = await Test_1.default.find({ deleted: true });
        res.status(200).json({ tests });
    }
    catch (error) {
        console.log("[ERROR WHILE RETRIEVING DELETED TESTS]: ", error);
    }
};
exports.retrieveDeletedTests = retrieveDeletedTests;
const getDeletedTests = async (req, res) => {
    try {
        const tests = await Test_1.default.find({ deleted: true });
        res.status(200).json({ tests });
    }
    catch (error) {
        console.log("[ERROR WHILE FETCHING DELETED TESTS]: ", error);
    }
};
exports.getDeletedTests = getDeletedTests;
