import express from 'express';
import productRoutes from './routes/products.js';
import customerRoutes from './routes/customers.js';
import orderRoutes from './routes/orders.js';
import authRoutes from './routes/auth.js';
import cron from 'node-cron';
import { syncShopifyData } from './jobs/shopifySyncJob.js';


import dashboardRoutes from './routes/dashboard.js';
import shopifyRoutes from './routes/shopify.js';

import cors from 'cors';



const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);


app.use('/api/dashboard', dashboardRoutes);
app.use('/api/shopify', shopifyRoutes);

cron.schedule('0 * * * *', async () => {
  // Fetch tenant IDs from your DB or User table here
  const tenantIds = [1, 2]; // Replace with real fetching logic

  for (const tenantId of tenantIds) {
    await syncShopifyData(tenantId);
  }
  console.log('Shopify data sync job completed');
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
