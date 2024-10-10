"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const uri = process.env.MONGO_URI || "mongodb://localhost:27017/testAPI"; // fetching the URI from .env file
const connectDb = async () => {
    try {
        await mongoose_1.default.connect(uri);
        console.log("Connection established with MongoDb");
    }
    catch (error) {
        console.log("[ERROR IN CONNECTING MONGODB]: ", error);
    }
};
exports.default = connectDb;
