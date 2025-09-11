import React, { useEffect, useState, useContext } from 'react';
import { fetchOrders } from '../api/ordersApi';
import { AuthContext } from '../context/AuthContext';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Card,
  Box,
  Chip
} from '@mui/material';
import moment from 'moment';

function OrdersPage() {
  const { authData } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      try {
        const data = await fetchOrders(authData.token);
        setOrders(data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading orders:', error);
        setLoading(false);
      }
    }
    loadOrders();
  }, [authData.token]);

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Loading orders...</Typography>
      </Box>
    );
  }

  const totalRevenue = orders.reduce((sum, order) => sum + parseFloat(order.amount || 0), 0);
  const averageOrderValue = orders.length ? totalRevenue / orders.length : 0;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4, color: '#1a237e' }}>
        Orders
      </Typography>

      {/* Summary Cards */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
        gap: 3, 
        mb: 4 
      }}>
        <Card sx={{ p: 2, backgroundColor: '#ffffff' }}>
          <Typography variant="subtitle1" color="textSecondary">
            Total Orders
          </Typography>
          <Typography variant="h4" sx={{ color: '#1a237e' }}>
            {orders.length}
          </Typography>
        </Card>

        <Card sx={{ p: 2, backgroundColor: '#ffffff' }}>
          <Typography variant="subtitle1" color="textSecondary">
            Total Revenue
          </Typography>
          <Typography variant="h4" sx={{ color: '#1a237e' }}>
            ₹{totalRevenue.toFixed(2)}
          </Typography>
        </Card>

        <Card sx={{ p: 2, backgroundColor: '#ffffff' }}>
          <Typography variant="subtitle1" color="textSecondary">
            Average Order Value
          </Typography>
          <Typography variant="h4" sx={{ color: '#1a237e' }}>
            ₹{averageOrderValue.toFixed(2)}
          </Typography>
        </Card>
      </Box>

      {/* Orders Table */}
      <Card sx={{ mb: 4, backgroundColor: '#ffffff' }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="orders table">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#1a237e' }}>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Order ID</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Date</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Amount</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Billing Name</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Billing Email</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow
                  key={order.id}
                  sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}
                >
                  <TableCell>{order.id}</TableCell>
                  <TableCell>
                    {moment(order.orderDate).format('MMM DD, YYYY')}
                  </TableCell>
                  <TableCell>₹{parseFloat(order.amount || 0).toFixed(2)}</TableCell>
                  <TableCell>{order.billingName || '-'}</TableCell>
                  <TableCell>{order.billingEmail || '-'}</TableCell>
                  <TableCell>
                    <Chip
                      label={order.status || 'Pending'}
                      color={order.status === 'completed' ? 'success' : 'warning'}
                      size="small"
                      sx={{ minWidth: 80 }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
}

export default OrdersPage;
