import express from 'express';
import { createSubmission,
            getSubmissions,
            getSubmissionById,
            updateSubmission,
            deleteSubmission,
            permanentDeleteSubmission,
            retrieveDeletedSubmissions,
            evaluteSubmission
            } from '../controllers/submissionController';


const router = express.Router();

router.post('/submission', createSubmission);
router.get('/submissions', getSubmissions);
router.get('/submission/:id', getSubmissionById);
router.put('/submission/:id', updateSubmission);
router.delete('/submission/:id', deleteSubmission);
router.delete('/submission/permanent/:id', permanentDeleteSubmission);
router.put('/submission/retrieve/:id', retrieveDeletedSubmissions);
router.put('/submission/evaluate/:id', evaluteSubmission);

// router.get('/submissions/deleted', getDeletedSubmissions);

export default router;


