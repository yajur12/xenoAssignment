const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export async function fetchCustomers(token) {
  const res = await fetch(`${API_BASE}/customers`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function createCustomer(token, customer) {
  const res = await fetch(`${API_BASE}/customers`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(customer),
  });
  return res.json();
}
