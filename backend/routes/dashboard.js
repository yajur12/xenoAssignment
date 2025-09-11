import express from 'express';
import { getDashboardMetrics } from '../controllers/dashboardController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/metrics', authenticateToken, getDashboardMetrics);

export default router;
