import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import Alert from '../../components/Alert';
import ConfirmDialog from '../../components/ConfirmDialog';
import { deleteProperty, fetchDealerProperties } from '../../api/services/dealerService';
import { getPropertyDisplayTitle, formatPrice } from '../../utils/propertyHelpers';
import { dealerNav } from '../../utils/navConfig';

const DealerPropertiesPage = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteId, setDeleteId] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchDealerProperties({ amount: 100 });
      setProperties(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load properties.');
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
      await deleteProperty(deleteId);
      setDeleteId(null);
      await load();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete property.');
      setDeleteId(null);
    }
  };

  return (
    <DashboardLayout title="My Listings" subtitle="Create, edit, or remove your properties." navLinks={dealerNav}>
      <div className="flex justify-end">
        <Link
          to="/dealer/properties/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          Add property
        </Link>
      </div>

      <Alert type="error" message={error} onClose={() => setError('')} />

      {loading ? (
        <p className="text-sm text-gray-500">Loading listings...</p>
      ) : properties.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center text-gray-500">
          No properties yet. Add your first listing.
        </div>
      ) : (
        <div className="space-y-3">
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <h3 className="font-bold text-gray-900">{getPropertyDisplayTitle(property)}</h3>
                <p className="text-sm text-gray-500">
                  {property.location} · ₹{formatPrice(property.price)} · {property.status}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => navigate(`/property/${property.id}`)}
                  className="px-3 py-2 text-sm text-gray-600 bg-gray-50 rounded-lg"
                >
                  View
                </button>
                <button
                  type="button"
                  onClick={() => navigate(`/dealer/properties/${property.id}/edit`)}
                  className="px-3 py-2 text-sm text-blue-600 bg-blue-50 rounded-lg inline-flex items-center gap-1"
                >
                  <Pencil className="w-4 h-4" />
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteId(property.id)}
                  className="px-3 py-2 text-sm text-red-600 bg-red-50 rounded-lg inline-flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!deleteId}
        title="Delete property?"
        message="This will permanently remove the listing and related data."
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        danger
      />
    </DashboardLayout>
  );
};

export default DealerPropertiesPage;