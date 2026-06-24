import { useEffect, useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import Alert from '../../components/Alert';
import ApplicationStatusBadge from '../../components/ApplicationStatusBadge';
import {
  approveApplication,
  rejectApplication,
  fetchDealerApplications,
} from '../../api/services/dealerService';
import { fetchPropertyById } from '../../api/services/propertyService';
import { dealerNav } from '../../utils/navConfig';

const DealerApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchDealerApplications();
      const enriched = await Promise.all(
        data.map(async (app) => {
          try {
            const property = await fetchPropertyById(app.propertyId);
            return { ...app, propertyLabel: property.location };
          } catch {
            return { ...app, propertyLabel: `Property #${app.propertyId}` };
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

  useEffect(() => {
    load();
  }, []);

  const handleApprove = async (applicationId) => {
    try {
      await approveApplication(applicationId);
      setMessage('Application approved.');
      await load();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to approve application.');
    }
  };

  const handleReject = async (applicationId) => {
    try {
      await rejectApplication(applicationId);
      setMessage('Application rejected.');
      await load();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reject application.');
    }
  };

  return (
    <DashboardLayout
      title="Rental applications"
      subtitle="Review and respond to customer applications on your properties."
      navLinks={dealerNav}
    >
      <Alert type="error" message={error} onClose={() => setError('')} />
      <Alert type="success" message={message} onClose={() => setMessage('')} />

      {loading ? (
        <p className="text-sm text-gray-500">Loading applications...</p>
      ) : applications.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center text-gray-500">
          No applications received yet.
        </div>
      ) : (
        <div className="space-y-3">
          {applications.map((app) => (
            <div
              key={app.id}
              className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
            >
              <div>
                <p className="font-bold text-gray-900">Application #{app.id}</p>
                <p className="text-sm text-gray-500 mt-0.5">{app.propertyLabel}</p>
                <p className="text-xs text-gray-400 mt-1">Submitted: {app.submittedDate || '—'}</p>
                <div className="mt-2">
                  <ApplicationStatusBadge status={app.status} />
                </div>
              </div>
              {(app.status === 'UNREAD' || app.status === 'READ') && (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleApprove(app.id)}
                    className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700"
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    onClick={() => handleReject(app.id)}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default DealerApplicationsPage;