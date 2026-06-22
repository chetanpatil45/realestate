import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import Alert from '../../components/Alert';
import ApplicationStatusBadge from '../../components/ApplicationStatusBadge';
import { fetchApplications } from '../../api/services/customerService';
import { fetchPropertyById } from '../../api/services/propertyService';
import { customerNav } from '../../utils/navConfig';
import { FileText } from 'lucide-react';

const ApplicationsPage = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchApplications();
        const enriched = await Promise.all(
          data.map(async (app) => {
            try {
              const property = await fetchPropertyById(app.propertyId);
              return { ...app, propertyTitle: property.location };
            } catch {
              return { ...app, propertyTitle: `Property #${app.propertyId}` };
            }
          })
        );
        setApplications(enriched);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load applications.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <DashboardLayout title="My Applications" subtitle="Track rental application status." navLinks={customerNav}>
      <Alert type="error" message={error} onClose={() => setError('')} />

      {loading ? (
        <p className="text-sm text-gray-500">Loading applications...</p>
      ) : applications.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
          <FileText className="w-10 h-10 text-gray-300 mx-auto mb-2" />
          <p className="text-gray-500">No applications submitted yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-500">
              <tr>
                <th className="px-4 py-3 font-medium">ID</th>
                <th className="px-4 py-3 font-medium">Property</th>
                <th className="px-4 py-3 font-medium">Submitted</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">#{app.id}</td>
                  <td className="px-4 py-3">{app.propertyTitle}</td>
                  <td className="px-4 py-3 text-gray-500">{app.submittedDate || '—'}</td>
                  <td className="px-4 py-3">
                    <ApplicationStatusBadge status={app.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => navigate(`/customer/applications/${app.id}`)}
                      className="text-blue-600 font-medium hover:underline"
                    >
                      Details
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

export default ApplicationsPage;