import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import LoginRegister from './pages/LoginRegister';
import CustomerDashboard from './pages/CustomerDashboard';
import DealerDashboard from './pages/DealerDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        {/* Auth Route: Redirect to dashboard if already logged in */}
        <Route 
          path="/" 
          element={user ? <Navigate to={user.role === 'DEALER' ? '/dealer' : '/customer'} replace /> : <LoginRegister />} 
        />

        {/* Protected Customer Route */}
        <Route 
          path="/customer" 
          element={
            <ProtectedRoute allowedRole="CUSTOMER">
              <CustomerDashboard />
            </ProtectedRoute>
          } 
        />

        {/* Protected Dealer Route */}
        <Route 
          path="/dealer" 
          element={
            <ProtectedRoute allowedRole="DEALER">
              <DealerDashboard />
            </ProtectedRoute>
          } 
        />

        {/* Catch-all redirect to login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;