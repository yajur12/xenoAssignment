import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authData, setAuthData] = useState(() => {
    const saved = localStorage.getItem('authData');
    return saved ? JSON.parse(saved) : null;
  });

  React.useEffect(() => {
    if (authData) localStorage.setItem('authData', JSON.stringify(authData));
    else localStorage.removeItem('authData');
  }, [authData]);

  return (
    <AuthContext.Provider value={{ authData, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
}
