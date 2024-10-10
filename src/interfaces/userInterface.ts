import { Document } from "mongoose";

interface ISchemaUser extends Document {
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    deleted: boolean;
}

interface IUser{
    username: string;
    email: string;
    password: string;
}

export {IUser, ISchemaUser}