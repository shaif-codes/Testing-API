"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieveUser = exports.permanentDeleteUser = exports.deleteUser = exports.updateUser = exports.getUser = exports.getUsers = exports.createUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            res.status(400).json({ message: "Please provide all the details" });
            return;
        }
        // await User.createIndexes({ username: 1, email: 1 });
        const existingUser = await User_1.default.find({ $or: [{ username }, { email }] });
        // console.log(existingUser)
        if (existingUser.length > 0) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        const user = new User_1.default({
            username,
            email,
            password,
            createdAt: new Date(),
            updatedAt: new Date(),
            deleted: false
        });
        await user.save();
        res.status(201).json({ message: "created user succefully", user });
    }
    catch (error) {
        console.log("[ERROR WHILE CREATING USER]: ", error);
    }
};
exports.createUser = createUser;
const getUsers = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);
        const users = await User_1.default.find()
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber);
        const totalUsers = await User_1.default.countDocuments();
        res.status(200).json({
            users,
            totalPages: Math.ceil(totalUsers / limitNumber),
            currentPage: pageNumber
        });
    }
    catch (error) {
        console.log("[ERROR WHILE FETCHING USERS]: ", error);
    }
};
exports.getUsers = getUsers;
const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User_1.default.findById(id);
        res.status(200).json({ user });
    }
    catch (error) {
        console.log("[ERROR WHILE FETCHING USER]: ", error);
    }
};
exports.getUser = getUser;
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            res.status(400).json({ message: "Please provide all the details" });
            return;
        }
        const user = await User_1.default.findByIdAndUpdate(id, {
            username,
            email,
            password,
            updatedAt: new Date()
        }, { new: true });
        res.status(200).json({ message: "updated user details succesfully", user });
    }
    catch (error) {
        console.log("[ERROR WHILE UPDATING USER]: ", error);
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User_1.default.findByIdAndUpdate(id, { deleted: true });
        res.status(200).json({ message: "User deleted successfully" });
    }
    catch (error) {
        console.log("[ERROR: WHILE DELETING USER]: ", error);
    }
};
exports.deleteUser = deleteUser;
const permanentDeleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User_1.default.findByIdAndDelete(id);
        res.status(200).json({ message: "User deleted permanently" });
    }
    catch (error) {
        console.log("[ERROR WHILE PERMANENTLY DELETING USER]: ", error);
    }
};
exports.permanentDeleteUser = permanentDeleteUser;
const retrieveUser = async (req, res) => {
    try {
        const { id } = req.params;
        //checking if the user is already retrieved
        const existingUser = await User_1.default.find({ id, deleted: true });
        if (!existingUser) {
            res.status(404).json({ message: "User not found in deleted Users" });
            return;
        }
        await User_1.default.findByIdAndUpdate(id, { deleted: false });
        res.status(200).json({ message: "User retrieved successfully" });
    }
    catch (error) {
        console.log("[ERROR WHILE RETRIEVING USER]: ", error);
    }
};
exports.retrieveUser = retrieveUser;
