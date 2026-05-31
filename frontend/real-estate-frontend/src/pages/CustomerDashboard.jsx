import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const CustomerDashboard = () => {
  const { logout, user } = useContext(AuthContext);
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center border-b pb-4 mb-6">
        <h1 className="text-2xl font-bold">Customer Dashboard</h1>
        <button onClick={logout} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
          Logout
        </button>
      </div>
      <p className="text-gray-600">Welcome! Here you will browse available property cards.</p>
    </div>
  );
};
export default CustomerDashboard;