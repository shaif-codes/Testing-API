"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const questionSchema = new mongoose_1.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
    options: { type: [String], required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deleted: { type: Boolean, default: false }
});
// questionSchema.pre(/^find/, function(next) {
//     (this as any).where({deleted: {$ne: true}});
//     next();
// });
const Question = (0, mongoose_1.model)('Question', questionSchema);
exports.default = Question;
