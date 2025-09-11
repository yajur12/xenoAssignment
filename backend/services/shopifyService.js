import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const shopDomain = process.env.SHOPIFY_STORE_DOMAIN;
const accessToken = process.env.SHOPIFY_ACCESS_TOKEN;

const shopifyApi = axios.create({
  baseURL: `https://${shopDomain}/admin/api/2023-04/`,
  headers: {
    'X-Shopify-Access-Token': accessToken,
    'Content-Type': 'application/json',
  },
});


export const fetchProducts = async () => {
  try {
    const response = await shopifyApi.get('products.json');
    return response.data.products;
  } catch (err) {
    console.error('[ShopifyService] Error fetching products:', err.response?.data || err.message);
    return [];
  }
};


export const fetchCustomers = async () => {
  try {
    const response = await shopifyApi.get('customers.json');
    return response.data.customers;
  } catch (err) {
    console.error('[ShopifyService] Error fetching customers:', err.response?.data || err.message);
    return [];
  }
};


export const fetchOrders = async () => {
  try {
    const response = await shopifyApi.get('orders.json');
    return response.data.orders;
  } catch (err) {
    console.error('[ShopifyService] Error fetching orders:', err.response?.data || err.message);
    return [];
  }
};
