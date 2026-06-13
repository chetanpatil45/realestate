import { useEffect, useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import Alert from '../../components/Alert';
import ConfirmDialog from '../../components/ConfirmDialog';
import {
  banAccount,
  deleteAccount,
  fetchAllAccounts,
  unbanAccount,
} from '../../api/services/adminService';
import { adminNav } from '../../utils/navConfig';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [deleteId, setDeleteId] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchAllAccounts();
      setUsers(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load users.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteAccount(deleteId);
      setMessage('User deleted.');
      setDeleteId(null);
      await load();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete user.');
      setDeleteId(null);
    }
  };

  const handleBan = async (userId) => {
    const till = new Date();
    till.setDate(till.getDate() + 30);
    try {
      await banAccount(userId, till.toISOString());
      setMessage('User banned for 30 days.');
      await load();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to ban user.');
    }
  };

  const handleUnban = async (userId) => {
    try {
      await unbanAccount(userId);
      setMessage('User unbanned.');
      await load();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to unban user.');
    }
  };

  return (
    <DashboardLayout title="User management" subtitle="View, ban, or remove platform accounts." navLinks={adminNav}>
      <Alert type="error" message={error} onClose={() => setError('')} />
      <Alert type="success" message={message} onClose={() => setMessage('')} />

      {loading ? (
        <p className="text-sm text-gray-500">Loading users...</p>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-500">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((u) => (
                <tr key={u.id}>
                  <td className="px-4 py-3 font-medium">#{u.id}</td>
                  <td className="px-4 py-3">{u.firstName} {u.lastName}</td>
                  <td className="px-4 py-3">{u.email}</td>
                  <td className="px-4 py-3">{u.role}</td>
                  <td className="px-4 py-3">{u.bannedTill ? 'Banned' : 'Active'}</td>
                  <td className="px-4 py-3 text-right space-x-2">
                    {u.bannedTill ? (
                      <button type="button" onClick={() => handleUnban(u.id)} className="text-emerald-600 font-medium">
                        Unban
                      </button>
                    ) : (
                      <button type="button" onClick={() => handleBan(u.id)} className="text-amber-600 font-medium">
                        Ban
                      </button>
                    )}
                    <button type="button" onClick={() => setDeleteId(u.id)} className="text-red-600 font-medium">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDialog
        open={!!deleteId}
        title="Delete user?"
        message="This permanently removes the user account."
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        danger
      />
    </DashboardLayout>
  );
};

export default AdminUsersPage;