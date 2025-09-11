import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { getAllCustomers, createCustomer } from '../controllers/customerController.js';

const router = express.Router();

router.use(authenticateToken);

router.get('/', getAllCustomers);
router.post('/', createCustomer);

export default router;
