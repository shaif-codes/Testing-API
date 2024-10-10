import mongoose from 'mongoose'
import 'dotenv/config'


const uri: string = process.env.MONGO_URI || "mongodb://localhost:27017/testAPI" // fetching the URI from .env file

const connectDb = async (): Promise<void> =>{
    try{
        await mongoose.connect(uri);
        console.log("Connection established with MongoDb")

    }
    catch(error){
        console.log("[ERROR IN CONNECTING MONGODB]: ", error);
    }
}

export default connectDb;