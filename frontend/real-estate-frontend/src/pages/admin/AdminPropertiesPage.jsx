import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import Alert from '../../components/Alert';
import PropertyFilters from '../../components/PropertyFilters';
import { fetchProperties } from '../../api/services/propertyService';
import { filterProperties, getPropertyDisplayTitle, formatPrice } from '../../utils/propertyHelpers';
import { adminNav } from '../../utils/navConfig';

const defaultFilters = {
  searchTerm: '',
  propertyType: '',
  status: '',
  minPrice: '',
  maxPrice: '',
  minRooms: '',
};

const AdminPropertiesPage = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchProperties({ amount: 100 });
        setProperties(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load properties.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = filterProperties(properties, filters);

  return (
    <DashboardLayout
      title="Properties"
      subtitle="Read-only overview of all platform listings (no admin property API)."
      navLinks={adminNav}
    >
      <div className="bg-white p-4 rounded-2xl border border-gray-100">
        <PropertyFilters filters={filters} onChange={setFilters} />
      </div>

      <Alert type="error" message={error} onClose={() => setError('')} />

      {loading ? (
        <p className="text-sm text-gray-500">Loading properties...</p>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-500">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Listing</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((p) => (
                <tr key={p.id}>
                  <td className="px-4 py-3 font-medium">#{p.id}</td>
                  <td className="px-4 py-3">{getPropertyDisplayTitle(p)}</td>
                  <td className="px-4 py-3">{p.location}</td>
                  <td className="px-4 py-3">₹{formatPrice(p.price)}</td>
                  <td className="px-4 py-3">{p.status}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => navigate(`/property/${p.id}`)}
                      className="text-blue-600 font-medium"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  );
};

export default AdminPropertiesPage;