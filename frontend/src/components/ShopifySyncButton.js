import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { triggerShopifySync } from '../api/shopifyApi';

function ShopifySyncButton() {
  const { authData } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSync = async () => {
    setLoading(true);
    setMessage('');
    try {
      const res = await triggerShopifySync(authData.token);
      setMessage(res.message || 'Sync triggered!');
    } catch (err) {
      setMessage('Sync failed');
    }
    setLoading(false);
  };

  return (
    <div style={{ margin: '1rem 0' }}>
      <button onClick={handleSync} disabled={loading}>
        {loading ? 'Syncing...' : 'Sync Shopify Data'}
      </button>
      {message && <div style={{ marginTop: 8 }}>{message}</div>}
    </div>
  );
}

export default ShopifySyncButton;
