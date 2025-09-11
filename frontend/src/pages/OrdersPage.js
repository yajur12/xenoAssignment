import React, { useEffect, useState, useContext } from 'react';
import { fetchOrders } from '../api/ordersApi';
import { AuthContext } from '../context/AuthContext';

function OrdersPage() {
  const { authData } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function loadOrders() {
      const data = await fetchOrders(authData.token);
      setOrders(data);
    }
    loadOrders();
  }, [authData.token]);

  return (
    <div>
      <h2>Orders</h2>
      <ul>
        {orders.map(o => (
          <li key={o.id}>
            Order ID: {o.id}, Amount: ₹{o.amount}, Date: {new Date(o.orderDate).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrdersPage;
