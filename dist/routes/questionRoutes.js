"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const questionControllers_1 = require("../controllers/questionControllers");
const router = express_1.default.Router();
router.post('/question', questionControllers_1.createQuestion);
router.get('/questions', questionControllers_1.getQuestions);
router.get('/question/:id', questionControllers_1.getQuestionById);
router.put('/question/:id', questionControllers_1.updateQuestion);
router.delete('/question/:id', questionControllers_1.deleteQuestion);
router.delete('/question/permanent/:id', questionControllers_1.permanentDeleteQuestion);
router.put('/question/retrieve/:id', questionControllers_1.retrieveDeletedQuestions);
router.get('/questions/deleted', questionControllers_1.getDeletedQuestions);
exports.default = router;
