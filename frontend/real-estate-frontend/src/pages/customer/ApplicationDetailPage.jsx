import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import Alert from '../../components/Alert';
import ApplicationStatusBadge from '../../components/ApplicationStatusBadge';
import ConfirmDialog from '../../components/ConfirmDialog';
import {
  fetchApplicationById,
  withdrawApplication,
} from '../../api/services/customerService';
import { fetchPropertyById } from '../../api/services/propertyService';
import { customerNav } from '../../utils/navConfig';
import { getPropertyDisplayTitle } from '../../utils/propertyHelpers';

const ApplicationDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [confirmWithdraw, setConfirmWithdraw] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const app = await fetchApplicationById(id);
        setApplication(app);
        if (app.propertyId) {
          const prop = await fetchPropertyById(app.propertyId);
          setProperty(prop);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load application.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleWithdraw = async () => {
    try {
      await withdrawApplication(id);
      setMessage('Application withdrawn successfully.');
      setConfirmWithdraw(false);
      navigate('/customer/applications');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to withdraw application.');
      setConfirmWithdraw(false);
    }
  };

  return (
    <DashboardLayout title={`Application #${id}`} navLinks={customerNav}>
      <Alert type="error" message={error} onClose={() => setError('')} />
      <Alert type="success" message={message} onClose={() => setMessage('')} />

      {loading ? (
        <p className="text-sm text-gray-500">Loading...</p>
      ) : application ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <ApplicationStatusBadge status={application.status} />
            {application.status !== 'APPROVED' && application.status !== 'REJECTED' && (
              <button
                type="button"
                onClick={() => setConfirmWithdraw(true)}
                className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100"
              >
                Withdraw application
              </button>
            )}
          </div>

          <dl className="grid sm:grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="text-gray-500">Property</dt>
              <dd className="font-medium">
                {property ? getPropertyDisplayTitle(property) : `#${application.propertyId}`}
              </dd>
            </div>
            <div>
              <dt className="text-gray-500">Submitted</dt>
              <dd className="font-medium">{application.submittedDate || '—'}</dd>
            </div>
          </dl>

          {application.personalDetails && (
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-2">Applicant</h3>
              <p className="text-sm text-gray-600">
                {[
                  application.personalDetails.firstName,
                  application.personalDetails.middleName,
                  application.personalDetails.lastName,
                ]
                  .filter(Boolean)
                  .join(' ')}
              </p>
            </div>
          )}

          {property && (
            <button
              type="button"
              onClick={() => navigate(`/property/${property.id}`)}
              className="text-blue-600 text-sm font-medium"
            >
              View property →
            </button>
          )}
        </div>
      ) : null}

      <ConfirmDialog
        open={confirmWithdraw}
        title="Withdraw application?"
        message="This action cannot be undone."
        confirmLabel="Withdraw"
        onConfirm={handleWithdraw}
        onCancel={() => setConfirmWithdraw(false)}
        danger
      />
    </DashboardLayout>
  );
};

export default ApplicationDetailPage;