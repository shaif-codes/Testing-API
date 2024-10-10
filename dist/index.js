"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const dbConfig_1 = __importDefault(require("./config/dbConfig"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const questionRoutes_1 = __importDefault(require("./routes/questionRoutes"));
const testRoutes_1 = __importDefault(require("./routes/testRoutes"));
const submissionRoutes_1 = __importDefault(require("./routes/submissionRoutes"));
//setting express and fetching port from .env
const app = (0, express_1.default)();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//establishing connection from MongoDB
(0, dbConfig_1.default)();
//setting routes
app.get('/', (req, res) => {
    res.send('Welcome to the Testing API');
});
app.use('/api', userRoutes_1.default); // setting user routes
app.use('/api', questionRoutes_1.default); // setting question routes
app.use('/api', testRoutes_1.default); // setting test routes
app.use('/api', submissionRoutes_1.default); // setting submission routes
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
