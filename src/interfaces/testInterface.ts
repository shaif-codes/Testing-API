import { Document, Schema } from "mongoose";

interface ISchemaTest extends Document {
    name: String,
    description: String,
    questions: Schema.Types.ObjectId[],
    createdAt: Date,
    updatedAt: Date,
    deleted: Boolean
}

interface ITest {
    name: String,
    description: String,
    questions: Schema.Types.ObjectId
}

export { ITest, ISchemaTest }