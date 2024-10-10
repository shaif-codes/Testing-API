"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const submissionController_1 = require("../controllers/submissionController");
const router = express_1.default.Router();
router.post('/submission', submissionController_1.createSubmission);
router.get('/submissions', submissionController_1.getSubmissions);
router.get('/submission/:id', submissionController_1.getSubmissionById);
router.put('/submission/:id', submissionController_1.updateSubmission);
router.delete('/submission/:id', submissionController_1.deleteSubmission);
router.delete('/submission/permanent/:id', submissionController_1.permanentDeleteSubmission);
router.put('/submission/retrieve/:id', submissionController_1.retrieveDeletedSubmissions);
router.put('/submission/evaluate/:id', submissionController_1.evaluteSubmission);
// router.get('/submissions/deleted', getDeletedSubmissions);
exports.default = router;
