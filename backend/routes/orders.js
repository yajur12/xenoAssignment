import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { getAllOrders, createOrder } from '../controllers/orderController.js';

const router = express.Router();

router.use(authenticateToken);

router.get('/', getAllOrders);
router.post('/', createOrder);

export default router;
