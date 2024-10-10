import express from 'express';
import { createTest,
            getTests,
            getTestById,
            updateTest,
            deleteTest,
            permanentDeleteTest,
            retrieveDeletedTests,
            getDeletedTests
            } from '../controllers/testController';

const router = express.Router();

router.post('/test', createTest);
router.get('/tests', getTests);
router.get('/test/:id', getTestById);
router.put('/test/:id', updateTest);
router.delete('/test/:id', deleteTest);
router.delete('/test/permanent/:id', permanentDeleteTest);
router.put('/test/retrieve/:id', retrieveDeletedTests);
router.get('/tests/deleted', getDeletedTests);


export default router;