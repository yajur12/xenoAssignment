import React from 'react';

function ChartComponent({ ordersByDate = [], topCustomers = [] }) {
  return (
    <div>
      <h3>Orders by Date</h3>
      <table border="1" cellPadding="4">
        <thead>
          <tr>
            <th>Date</th>
            <th>Order Count</th>
            <th>Revenue</th>
          </tr>
        </thead>
        <tbody>
          {ordersByDate.map((row, idx) => (
            <tr key={idx}>
              <td>{row.date}</td>
              <td>{row.orderCount}</td>
              <td>${parseFloat(row.revenue).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Top 5 Customers by Spend</h3>
      <table border="1" cellPadding="4">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Total Spent</th>
          </tr>
        </thead>
        <tbody>
          {topCustomers.map((row, idx) => (
            <tr key={idx}>
              <td>{row.Customer?.name || '-'}</td>
              <td>{row.Customer?.email || '-'}</td>
              <td>${parseFloat(row.totalSpent).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Replace tables with charts using Chart.js or Recharts for production */}
    </div>
  );
}

export default ChartComponent;
