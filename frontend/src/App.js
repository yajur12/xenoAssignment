import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './styles/main.css';
import './styles/layout.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProductsPage from './pages/ProductsPage';
import OrdersPage from './pages/OrdersPage';
import CustomersPage from './pages/CustomersPage';
import Sidebar from './components/Sidebar';
import { AuthProvider, AuthContext } from './context/AuthContext';

function ProtectedRoute({ children }) {
  const { authData } = React.useContext(AuthContext);
  return authData?.token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <div className="app-container">
                    <Sidebar />
                    <main className="main-content">
                      <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/users" element={<CustomersPage />} />
                        <Route path="/products" element={<ProductsPage />} />
                        <Route path="/orders" element={<OrdersPage />} />
                        <Route path="/" element={<Navigate to="/dashboard" />} />
                      </Routes>
                    </main>
                  </div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
