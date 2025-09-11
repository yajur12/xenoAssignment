import React, { useEffect, useState, useContext } from 'react';
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
import { AuthContext } from '../context/AuthContext';
import { fetchProducts } from '../api/productsApi';

function ProductsPage() {
  const { authData } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchProducts(authData.token);
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading products:', error);
        setLoading(false);
      }
    }
    loadProducts();
  }, [authData.token]);

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Loading products...</Typography>
      </Box>
    );
  }

  const totalStock = products.reduce((sum, product) => sum + (product.stock || 0), 0);
  const totalValue = products.reduce((sum, product) => sum + ((product.price || 0) * (product.stock || 0)), 0);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4, color: '#1a237e' }}>
        Products
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
            Total Products
          </Typography>
          <Typography variant="h4" sx={{ color: '#1a237e' }}>
            {products.length}
          </Typography>
        </Card>

        <Card sx={{ p: 2, backgroundColor: '#ffffff' }}>
          <Typography variant="subtitle1" color="textSecondary">
            Total Stock
          </Typography>
          <Typography variant="h4" sx={{ color: '#1a237e' }}>
            {totalStock}
          </Typography>
        </Card>

        <Card sx={{ p: 2, backgroundColor: '#ffffff' }}>
          <Typography variant="subtitle1" color="textSecondary">
            Total Inventory Value
          </Typography>
          <Typography variant="h4" sx={{ color: '#1a237e' }}>
            ₹{totalValue.toFixed(2)}
          </Typography>
        </Card>
      </Box>

      {/* Products Table */}
      <Card sx={{ mb: 4, backgroundColor: '#ffffff' }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="products table">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#1a237e' }}>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>SKU</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Price</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Stock</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow
                  key={product.id}
                  sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}
                >
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.sku}</TableCell>
                  <TableCell>₹{parseFloat(product.price || 0).toFixed(2)}</TableCell>
                  <TableCell>{product.stock || 0}</TableCell>
                  <TableCell>
                    <Chip
                      label={product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                      color={product.stock > 0 ? 'success' : 'error'}
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

export default ProductsPage;
