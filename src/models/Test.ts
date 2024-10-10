import {model, Schema} from 'mongoose';
import {ISchemaTest} from '../interfaces/testInterface';

const TestSchema  = new Schema<ISchemaTest>({
    name: {type: String, required: true},
    description: {type: String, required: true},
    questions: {type: [Schema.Types.ObjectId], ref: 'Question'},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    deleted: {type: Boolean, default: false}
});

// TestSchema.pre(/^find/, function(next) {
//     (this as any).where({deleted: {$ne: true}});
//     next();
// });

const Test = model('Test', TestSchema);

export default Test;

