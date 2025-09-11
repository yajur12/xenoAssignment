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
      const name = [c.first_name, c.last_name].filter(Boolean).join(' ') || c.email || `Customer ${c.id}`;
      console.log(`[ShopifySync] Saving customer:`, c.id, c.email);
      await Customer.upsert({
        id: c.id,
        name,
        email: c.email || null,
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
        billingName: o.billing_address?.name || o.customer?.first_name + ' ' + o.customer?.last_name || null,
        billingEmail: o.email || o.customer?.email || null,
      });
    }

    console.log(`Shopify data synced for tenant ${tenantId}`);
  } catch (err) {
    console.error('Error syncing Shopify data:', err);
  }
}
