import React, { useEffect, useState, useContext } from 'react';
import { fetchCustomers } from '../api/customersApi';
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
  Avatar,
  Chip,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  AccountCircle as AccountIcon
} from '@mui/icons-material';

function CustomersPage() {
  const { authData } = useContext(AuthContext);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCustomers() {
      try {
        const data = await fetchCustomers(authData.token);
        setCustomers(data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading customers:', error);
        setLoading(false);
      }
    }
    loadCustomers();
  }, [authData.token]);

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Loading customers...</Typography>
      </Box>
    );
  }

  const getCustomerInitials = (name) => {
    return name
      ? name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
      : '?';
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4, color: '#1a237e' }}>
        Customers
      </Typography>

      {/* Summary Cards */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: 3, 
        mb: 4 
      }}>
        <Card sx={{ p: 2, backgroundColor: '#ffffff' }}>
          <Typography variant="subtitle1" color="textSecondary">
            Total Customers
          </Typography>
          <Typography variant="h4" sx={{ color: '#1a237e' }}>
            {customers.length}
          </Typography>
        </Card>

        <Card sx={{ p: 2, backgroundColor: '#ffffff' }}>
          <Typography variant="subtitle1" color="textSecondary">
            Active Customers
          </Typography>
          <Typography variant="h4" sx={{ color: '#1a237e' }}>
            {customers.filter(c => c.isActive).length}
          </Typography>
        </Card>

        <Card sx={{ p: 2, backgroundColor: '#ffffff' }}>
          <Typography variant="subtitle1" color="textSecondary">
            New This Month
          </Typography>
          <Typography variant="h4" sx={{ color: '#1a237e' }}>
            {customers.filter(c => {
              const createdDate = new Date(c.createdAt);
              const thisMonth = new Date().getMonth();
              return createdDate.getMonth() === thisMonth;
            }).length}
          </Typography>
        </Card>
      </Box>

      {/* Customers Table */}
      <Card sx={{ mb: 4, backgroundColor: '#ffffff' }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="customers table">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#1a237e' }}>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Customer</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Contact Info</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Orders</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((customer) => (
                <TableRow
                  key={customer.id}
                  sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: '#1a237e' }}>
                        {getCustomerInitials(customer.name)}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2">
                          {customer.name || `Customer ${customer.id}`}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Joined {new Date(customer.createdAt).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{customer.id}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      {customer.email && (
                        <Tooltip title={customer.email}>
                          <IconButton size="small" color="primary">
                            <EmailIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                      {customer.phone && (
                        <Tooltip title={customer.phone}>
                          <IconButton size="small" color="primary">
                            <PhoneIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    {customer.totalOrders || 0}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={customer.isActive ? 'Active' : 'Inactive'}
                      color={customer.isActive ? 'success' : 'default'}
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

export default CustomersPage;
