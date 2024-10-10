import express from "express";
import { createQuestion, 
         getQuestions,
         getQuestionById,
         updateQuestion,
         deleteQuestion,
         permanentDeleteQuestion,
         retrieveDeletedQuestions,
         getDeletedQuestions
        } from "../controllers/questionControllers";

const router = express.Router();

router.post('/question', createQuestion);
router.get('/questions', getQuestions);
router.get('/question/:id', getQuestionById);
router.put('/question/:id', updateQuestion);
router.delete('/question/:id', deleteQuestion);
router.delete('/question/permanent/:id', permanentDeleteQuestion);
router.put('/question/retrieve/:id', retrieveDeletedQuestions);
router.get('/questions/deleted', getDeletedQuestions);

export default router;

