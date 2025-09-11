import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { getAllProducts, createProduct } from '../controllers/productController.js';

const router = express.Router();

router.use(authenticateToken);

router.get('/', getAllProducts);
router.post('/', createProduct);

export default router;
