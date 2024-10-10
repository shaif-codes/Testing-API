"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TestSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    questions: { type: [mongoose_1.Schema.Types.ObjectId], ref: 'Question' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deleted: { type: Boolean, default: false }
});
// TestSchema.pre(/^find/, function(next) {
//     (this as any).where({deleted: {$ne: true}});
//     next();
// });
const Test = (0, mongoose_1.model)('Test', TestSchema);
exports.default = Test;
