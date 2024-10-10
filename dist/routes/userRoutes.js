"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
router.post('/user', userController_1.createUser);
router.get('/users', userController_1.getUsers);
router.get('/user/:id', userController_1.getUser);
router.put('/user/:id', userController_1.updateUser);
router.delete('/user/:id', userController_1.deleteUser);
router.delete('/user/permanent/:id', userController_1.permanentDeleteUser);
router.put('/user/retrieve/:id', userController_1.retrieveUser);
exports.default = router;
