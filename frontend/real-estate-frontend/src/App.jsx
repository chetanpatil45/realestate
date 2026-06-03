import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Home from './pages/Home';
import LoginRegister from './pages/LoginRegister';
import CustomerDashboard from './pages/CustomerDashboard';
import DealerDashboard from './pages/DealerDashboard';
import AboutUs from './pages/AboutUs';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        {/* Public Main Landing Page */}
        <Route path="/" element={<Home />} />
        
        {/* Public About Us Page */}
        <Route path="/about" element={<AboutUs />} />

        {/* Auth Route: Redirect if already logged in, otherwise show login screen */}
        <Route 
          path="/login" 
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

        {/* Catch-all redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;