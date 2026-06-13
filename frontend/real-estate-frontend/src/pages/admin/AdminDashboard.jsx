import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Building2, Shield } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import Alert from '../../components/Alert';
import { fetchAllAccounts } from '../../api/services/adminService';
import { fetchProperties } from '../../api/services/propertyService';
import { adminNav } from '../../utils/navConfig';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    customers: 0,
    dealers: 0,
    properties: 0,
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const [accounts, properties] = await Promise.all([
          fetchAllAccounts(),
          fetchProperties({ amount: 100 }),
        ]);
        setStats({
          users: accounts.length,
          customers: accounts.filter((u) => u.role === 'CUSTOMER').length,
          dealers: accounts.filter((u) => u.role === 'DEALER').length,
          properties: properties.length,
        });
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load dashboard statistics.');
      }
    };
    load();
  }, []);

  return (
    <DashboardLayout title="Admin Dashboard" subtitle="Platform overview and management." navLinks={adminNav}>
      <Alert type="error" message={error} onClose={() => setError('')} />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <Users className="w-8 h-8 text-blue-600 mb-2" />
          <p className="text-2xl font-black">{stats.users}</p>
          <p className="text-sm text-gray-500">Total users</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <Shield className="w-8 h-8 text-emerald-600 mb-2" />
          <p className="text-2xl font-black">{stats.customers}</p>
          <p className="text-sm text-gray-500">Customers</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <Shield className="w-8 h-8 text-indigo-600 mb-2" />
          <p className="text-2xl font-black">{stats.dealers}</p>
          <p className="text-sm text-gray-500">Dealers</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <Building2 className="w-8 h-8 text-amber-600 mb-2" />
          <p className="text-2xl font-black">{stats.properties}</p>
          <p className="text-sm text-gray-500">Properties</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link to="/admin/users" className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium">
          Manage users
        </Link>
        <Link to="/admin/properties" className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium">
          View properties
        </Link>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;