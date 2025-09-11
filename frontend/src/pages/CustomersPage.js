import React, { useEffect, useState, useContext } from 'react';
import { fetchCustomers } from '../api/customersApi';
import { AuthContext } from '../context/AuthContext';

function CustomersPage() {
  const { authData } = useContext(AuthContext);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    async function loadCustomers() {
      const data = await fetchCustomers(authData.token);
      setCustomers(data);
    }
    loadCustomers();
  }, [authData.token]);

  return (
    <div>
      <h2>Customers</h2>
      <ul>
        {customers.map(c => (
          <li key={c.id}>
            {c.name} - {c.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomersPage;
