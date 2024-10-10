import {model, Schema} from 'mongoose';
import {ISchemaQuestion} from '../interfaces/questionInterface';

const questionSchema  = new Schema<ISchemaQuestion>({
    question: {type: String, required: true},
    answer: {type: String, required: true},
    options: {type: [String], required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    deleted: {type: Boolean, default: false}
});

// questionSchema.pre(/^find/, function(next) {
//     (this as any).where({deleted: {$ne: true}});
//     next();
// });

const Question = model<ISchemaQuestion>('Question', questionSchema);

export default Question;