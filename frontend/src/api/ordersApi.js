const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export async function fetchOrders(token, queryParams = '') {
  const url = queryParams ? `${API_BASE}/orders?${queryParams}` : `${API_BASE}/orders`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function createOrder(token, order) {
  const res = await fetch(`${API_BASE}/orders`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(order),
  });
  return res.json();
}
