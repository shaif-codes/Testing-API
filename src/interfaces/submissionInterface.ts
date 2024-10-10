import { Document, Schema } from "mongoose";
import { ISchemaQuestion } from "./questionInterface";

interface ISchemaSubmission extends Document {
    user: Schema.Types.ObjectId,
    testId: Schema.Types.ObjectId,
    response: Array<{question: Schema.Types.ObjectId, answer: string}>,
    score: number | null
    evaluatedAt: Date | null,
    createdAt: Date,
    updatedAt: Date,
    deleted: boolean,
}

interface IPopulatedSubmission extends Omit<ISchemaSubmission, "response"> {
    response: Array<{question: ISchemaQuestion, answer: string}>
}

interface ISubmission {
    user: string,
    testId: Schema.Types.ObjectId,
    response: Array<{question: Schema.Types.ObjectId, answer: string}>,
    score: number | null

}

export { ISubmission, ISchemaSubmission, IPopulatedSubmission }