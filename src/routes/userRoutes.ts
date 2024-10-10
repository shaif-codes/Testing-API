import express from 'express';
import { createUser, 
        getUsers, 
        getUser, 
        updateUser, 
        deleteUser,
        permanentDeleteUser,
        retrieveUser
    } from '../controllers/userController';

const router = express.Router();

router.post('/user', createUser);
router.get('/users', getUsers);
router.get('/user/:id', getUser);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);
router.delete('/user/permanent/:id', permanentDeleteUser);
router.put('/user/retrieve/:id', retrieveUser);

export default router;

