import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { fetchAccount } from '../api/services/userService';
import { normalizeRole } from '../utils/propertyHelpers';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const hydrateAccount = async (token, fallbackRole, extraDetails = {}) => {
    try {
      const account = await fetchAccount();
      const role = normalizeRole(account.role || fallbackRole);
      const details = {
        id: account.id,
        firstName: account.firstName,
        lastName: account.lastName,
        email: account.email,
        mobileNumber: account.mobileNumber,
        ...extraDetails,
      };
      setUser({ token, role, details });
      localStorage.setItem('role', role);
      localStorage.setItem('userData', JSON.stringify(details));
      return role;
    } catch {
      const role = normalizeRole(fallbackRole);
      setUser({ token, role, details: extraDetails });
      localStorage.setItem('role', role);
      localStorage.setItem('userData', JSON.stringify(extraDetails));
      return role;
    }
  };

  useEffect(() => {
    const bootstrap = async () => {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');
      const userData = localStorage.getItem('userData');

      if (!token) {
        setLoading(false);
        return;
      }

      let fallbackRole = role;
      try {
        const decoded = jwtDecode(token);
        fallbackRole = normalizeRole(decoded.role || role);
      } catch {
        /* use stored role */
      }

      const details = userData ? JSON.parse(userData) : {};
      await hydrateAccount(token, fallbackRole, details);
      setLoading(false);
    };

    bootstrap();
  }, []);

  const login = async (token, fallbackRole, extra = {}) => {
    localStorage.setItem('token', token);
    return hydrateAccount(token, fallbackRole, extra);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  const updateUserDetails = (partial) => {
    setUser((prev) => {
      if (!prev) return prev;
      const details = { ...prev.details, ...partial };
      localStorage.setItem('userData', JSON.stringify(details));
      return { ...prev, details };
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, updateUserDetails }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};