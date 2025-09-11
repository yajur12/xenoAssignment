const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export async function fetchProducts(token) {
  const res = await fetch(`${API_BASE}/products`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function createProduct(token, product) {
  const res = await fetch(`${API_BASE}/products`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(product),
  });
  return res.json();
}
