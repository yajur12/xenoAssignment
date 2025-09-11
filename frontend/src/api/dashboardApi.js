const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export async function fetchDashboardMetrics(token, params = '') {
  const res = await fetch(`${API_BASE}/dashboard/metrics${params ? '?' + params : ''}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}
