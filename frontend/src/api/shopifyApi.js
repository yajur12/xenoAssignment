const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export async function triggerShopifySync(token) {
  const res = await fetch(`${API_BASE}/shopify/sync`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}
