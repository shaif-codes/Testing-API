import { Schema, model, Document } from 'mongoose';
import {ISchemaUser} from '../interfaces/userInterface';

const userSchema = new Schema<ISchemaUser>({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deleted: { type: Boolean, default: false }
});

// Add a pre-find hook to filter out soft-deleted documents
// userSchema.pre(/^find/, function(next) {
//     (this as any).where({ deleted: { $ne: true } });
//     next();
// });

const User = model<ISchemaUser>('User', userSchema);

export default User;