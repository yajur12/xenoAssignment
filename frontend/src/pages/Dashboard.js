import React, { useEffect, useState, useContext } from 'react';
import { fetchDashboardMetrics } from '../api/dashboardApi';
import { AuthContext } from '../context/AuthContext';
import ChartComponent from '../components/ChartComponent';
import ProductsList from '../components/ProductsList';
import ShopifySyncButton from '../components/ShopifySyncButton';

function Dashboard() {
  const { authData } = useContext(AuthContext);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function loadMetrics() {
      setLoading(true);
      const data = await fetchDashboardMetrics(authData.token);
      setMetrics(data);
      setLoading(false);
    }
    loadMetrics();
  }, [authData.token]);

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div>
      <h1>Dashboard</h1>
  <ShopifySyncButton />
  <div style={{ display: 'flex', gap: '2rem' }}>
        <div>
          <strong>Total Customers:</strong> {metrics?.totalCustomers ?? '-'}
        </div>
        <div>
          <strong>Total Orders:</strong> {metrics?.totalOrders ?? '-'}
        </div>
        <div>
          <strong>Total Revenue:</strong> ${metrics?.totalRevenue?.toFixed(2) ?? '-'}
        </div>
      </div>
  <ChartComponent ordersByDate={metrics?.ordersByDate} topCustomers={metrics?.topCustomers} />
  <ProductsList />
    </div>
  );
}

export default Dashboard;
