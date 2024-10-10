import {model, Schema} from 'mongoose';
import {ISchemaSubmission} from '../interfaces/submissionInterface';

const submissionSchema  = new Schema<ISchemaSubmission>({
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    testId: {type: Schema.Types.ObjectId, ref: 'Test', required: true},
    response: [{question: {type: Schema.Types.ObjectId, ref: 'Question'}, answer: {type: String}}],
    score: {type: Number, default: null},
    evaluatedAt: {type: Date, default: null},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    deleted: {type: Boolean, default: false}
}, {timestamps: true});


const Submission = model<ISchemaSubmission>('Submission', submissionSchema);
export default Submission;