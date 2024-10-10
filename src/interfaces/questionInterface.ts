import { Document } from "mongoose";

interface ISchemaQuestion extends Document {
    question: string;
    answer: string;
    options: string[];
    createdAt: Date;
    updatedAt: Date;
    deleted: boolean;
}

interface IQuestion {
    question: string;
    answer: string;
    options: string[];
}

export { IQuestion, ISchemaQuestion }