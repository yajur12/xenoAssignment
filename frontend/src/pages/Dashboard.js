import React, { useEffect, useState, useContext } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { fetchDashboardMetrics } from '../api/dashboardApi';
import { AuthContext } from '../context/AuthContext';
import ProductsList from '../components/ProductsList';
import ShopifySyncButton from '../components/ShopifySyncButton';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  IconButton,
  Paper,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import {
  TrendingUp,
  People,
  ShoppingCart,
  AttachMoney,
  Speed,
  Refresh,
} from '@mui/icons-material';
import { 
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  ChartTooltip,
  Legend,
  Filler
);

function Dashboard() {
  const { authData } = useContext(AuthContext);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('week');

  const loadMetrics = async () => {
    try {
      setLoading(true);
      const data = await fetchDashboardMetrics(authData.token);
      setMetrics(data);
    } catch (error) {
      console.error('Error loading metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMetrics();
  }, [authData.token]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress size={60} thickness={4} sx={{ color: '#1a237e' }} />
      </Box>
    );
  }

  const salesChartData = {
    labels: metrics?.ordersByDate?.map(d => d.date) || [],
    datasets: [{
      label: 'Revenue',
      data: metrics?.ordersByDate?.map(d => d.total) || [],
      fill: true,
      borderColor: '#1a237e',
      backgroundColor: 'rgba(26, 35, 126, 0.1)',
      tension: 0.4
    }]
  };

  const customerChartData = {
    labels: metrics?.topCustomers?.map(c => c.name) || [],
    datasets: [{
      label: 'Revenue',
      data: metrics?.topCustomers?.map(c => c.totalSpent) || [],
      backgroundColor: [
        '#1a237e',
        '#283593',
        '#303f9f',
        '#3949ab',
        '#3f51b5'
      ],
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        font: {
          size: 16,
          weight: 'bold'
        }
      }
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ color: '#1a237e', fontWeight: 'bold' }}>
          Dashboard Overview
        </Typography>
        <Box>
          <ShopifySyncButton />
          <Tooltip title="Refresh Data">
            <IconButton onClick={() => loadMetrics()} sx={{ ml: 1 }}>
              <Refresh />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            bgcolor: '#ffffff',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s',
            '&:hover': { transform: 'translateY(-4px)' }
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography color="textSecondary" variant="h6">
                  Total Revenue
                </Typography>
                <AttachMoney sx={{ color: '#1a237e' }} />
              </Box>
              <Typography variant="h4" sx={{ color: '#1a237e' }}>
                ₹{metrics?.totalRevenue?.toFixed(2) || '0.00'}
              </Typography>
              <Typography variant="body2" sx={{ color: 'success.main', mt: 1 }}>
                +{metrics?.revenueGrowth || 0}% from last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            bgcolor: '#ffffff',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s',
            '&:hover': { transform: 'translateY(-4px)' }
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography color="textSecondary" variant="h6">
                  Total Orders
                </Typography>
                <ShoppingCart sx={{ color: '#1a237e' }} />
              </Box>
              <Typography variant="h4" sx={{ color: '#1a237e' }}>
                {metrics?.totalOrders || 0}
              </Typography>
              <Typography variant="body2" sx={{ color: 'success.main', mt: 1 }}>
                +{metrics?.orderGrowth || 0}% from last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            bgcolor: '#ffffff',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s',
            '&:hover': { transform: 'translateY(-4px)' }
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography color="textSecondary" variant="h6">
                  Total Customers
                </Typography>
                <People sx={{ color: '#1a237e' }} />
              </Box>
              <Typography variant="h4" sx={{ color: '#1a237e' }}>
                {metrics?.totalCustomers || 0}
              </Typography>
              <Typography variant="body2" sx={{ color: 'success.main', mt: 1 }}>
                +{metrics?.customerGrowth || 0}% from last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            bgcolor: '#ffffff',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s',
            '&:hover': { transform: 'translateY(-4px)' }
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography color="textSecondary" variant="h6">
                  Avg. Order Value
                </Typography>
                <Speed sx={{ color: '#1a237e' }} />
              </Box>
              <Typography variant="h4" sx={{ color: '#1a237e' }}>
                ₹{((metrics?.totalRevenue || 0) / (metrics?.totalOrders || 1)).toFixed(2)}
              </Typography>
              <Typography variant="body2" sx={{ color: 'success.main', mt: 1 }}>
                +{metrics?.avgOrderGrowth || 0}% from last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, height: '400px' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Revenue Trend</Typography>
            <Box sx={{ height: 'calc(100% - 40px)' }}>
              <Line 
                data={salesChartData} 
                options={{
                  ...chartOptions,
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: {
                        color: 'rgba(0,0,0,0.05)'
                      }
                    },
                    x: {
                      grid: {
                        display: false
                      }
                    }
                  }
                }}
              />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '400px' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Top Customers</Typography>
            <Box sx={{ height: 'calc(100% - 40px)' }}>
              <Doughnut 
                data={customerChartData}
                options={{
                  ...chartOptions,
                  cutout: '70%'
                }}
              />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Recent Products</Typography>
            <ProductsList />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;

