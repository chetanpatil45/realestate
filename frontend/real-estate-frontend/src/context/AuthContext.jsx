import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user session already exists on page load
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const userData = localStorage.getItem('userData');

    if (token && role) {
      setUser({ token, role, details: userData ? JSON.parse(userData) : null });
    }
    setLoading(false);
  }, []);

  const login = (token, role, userData) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('userData', JSON.stringify(userData));
    setUser({ token, role, details: userData });
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};