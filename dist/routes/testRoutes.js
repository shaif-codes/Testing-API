"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const testController_1 = require("../controllers/testController");
const router = express_1.default.Router();
router.post('/test', testController_1.createTest);
router.get('/tests', testController_1.getTests);
router.get('/test/:id', testController_1.getTestById);
router.put('/test/:id', testController_1.updateTest);
router.delete('/test/:id', testController_1.deleteTest);
router.delete('/test/permanent/:id', testController_1.permanentDeleteTest);
router.put('/test/retrieve/:id', testController_1.retrieveDeletedTests);
router.get('/tests/deleted', testController_1.getDeletedTests);
exports.default = router;
