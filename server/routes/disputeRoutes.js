import express from 'express';
import { raiseDispute, getAllDisputes, updateDisputeStatus, getUserDisputes } from '../controllers/disputeController.js';

const router = express.Router();

router.post('/raise', raiseDispute);
router.get('/', getAllDisputes); 
router.patch('/:id', updateDisputeStatus);
router.get('/user/:userId', getUserDisputes);


export default router;
