import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Building2, LogOut, User } from 'lucide-react';
import { getRoleHomePath, normalizeRole } from '../utils/propertyHelpers';

const DashboardLayout = ({ title, subtitle, navLinks = [], children }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const role = normalizeRole(user?.role);
  const homePath = getRoleHomePath(role);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <Link to={homePath} className="flex items-center space-x-2 shrink-0">
            <div className="p-2 bg-blue-600 text-white rounded-lg">
              <Building2 className="w-5 h-5" />
            </div>
            <span className="text-lg font-bold text-gray-900 tracking-tight hidden sm:inline">
              RealEstate Hub
            </span>
          </Link>

          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 whitespace-nowrap rounded-lg hover:bg-blue-50"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/profile"
              className="p-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-blue-50"
              title="Profile"
            >
              <User className="w-4 h-4" />
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg whitespace-nowrap"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {(title || subtitle) && (
          <div>
            {title && <h1 className="text-2xl font-black text-gray-900">{title}</h1>}
            {subtitle && <p className="text-gray-500 text-sm mt-0.5">{subtitle}</p>}
          </div>
        )}
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;