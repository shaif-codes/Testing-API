"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const submissionSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    testId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Test', required: true },
    response: [{ question: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Question' }, answer: { type: String } }],
    score: { type: Number, default: null },
    evaluatedAt: { type: Date, default: null },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deleted: { type: Boolean, default: false }
}, { timestamps: true });
const Submission = (0, mongoose_1.model)('Submission', submissionSchema);
exports.default = Submission;
