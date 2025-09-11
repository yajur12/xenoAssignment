import { fetchProducts, fetchCustomers, fetchOrders } from '../services/shopifyService.js';
import { Product, Customer, Order } from '../models/index.js';

export async function syncShopifyData(tenantId) {
  try {
    // Fetch from Shopify APIs

  const products = await fetchProducts();
  const customers = await fetchCustomers();
  const orders = await fetchOrders();

  console.log(`[ShopifySync] Products fetched:`, Array.isArray(products) ? products.length : products);
  console.log(`[ShopifySync] Customers fetched:`, Array.isArray(customers) ? customers.length : customers);
  console.log(`[ShopifySync] Orders fetched:`, Array.isArray(orders) ? orders.length : orders);

    // Save products to DB with tenantId

    for (const p of products) {
      console.log(`[ShopifySync] Saving product:`, p.id, p.title);
      await Product.upsert({
        id: p.id, // or a mapping key
        name: p.title,
        price: p.variants[0]?.price || 0,
        tenantId,
      });
    }

    // Save customers to DB with tenantId

    for (const c of customers) {
      if (!c.email) {
        console.warn(`[ShopifySync] Skipping customer ${c.id} (no email)`);
        continue;
      }
      const name = [c.first_name, c.last_name].filter(Boolean).join(' ') || c.email;
      console.log(`[ShopifySync] Saving customer:`, c.id, c.email);
      await Customer.upsert({
        id: c.id,
        name,
        email: c.email,
        tenantId,
      });
    }

    // Save orders to DB with tenantId

    for (const o of orders) {
      console.log(`[ShopifySync] Saving order:`, o.id, o.total_price);
      await Order.upsert({
        id: o.id,
        orderDate: o.created_at,
        amount: parseFloat(o.total_price),
        customerId: o.customer?.id,
        tenantId,
      });
    }

    console.log(`Shopify data synced for tenant ${tenantId}`);
  } catch (err) {
    console.error('Error syncing Shopify data:', err);
  }
}
