import React, { useEffect, useState, useContext } from 'react';
import { fetchProducts } from '../api/productsApi';
import { AuthContext } from '../context/AuthContext';

function ProductsList() {
  const { authData } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      setError('');
      try {
        const data = await fetchProducts(authData.token);
        setProducts(data);
      } catch (err) {
        setError('Failed to fetch products');
      }
      setLoading(false);
    }
    loadProducts();
  }, [authData.token]);

  if (loading) return <div>Loading products...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <h2>Products List</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name} - ${product.price}</li>
        ))}
      </ul>
    </div>
  );
}

export default ProductsList;
