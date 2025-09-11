import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { syncShopifyData } from '../jobs/shopifySyncJob.js';

const router = express.Router();

// POST /api/shopify/sync - trigger Shopify sync for current tenant
router.post('/sync', authenticateToken, async (req, res) => {
  try {
    const tenantId = req.user.tenantId;
    await syncShopifyData(tenantId);
    res.json({ message: 'Shopify data sync started for your tenant.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
