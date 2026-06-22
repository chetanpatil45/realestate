import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import ApplicationForm from '../../components/customer/ApplicationForm';
import Alert from '../../components/Alert';
import { AuthContext } from '../../context/AuthContext';
import { createApplication } from '../../api/services/customerService';
import { fetchPropertyById } from '../../api/services/propertyService';
import { getPropertyDisplayTitle } from '../../utils/propertyHelpers';
import { customerNav } from '../../utils/navConfig';

const defaultForm = {
  personalDetails: {
    title: '',
    firstName: '',
    middleName: '',
    lastName: '',
    dob: '',
  },
  contactDetails: {
    contactNumber: '',
    contactEmail: '',
  },
};

const ApplyForRentPage = () => {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [property, setProperty] = useState(null);
  const [form, setForm] = useState(defaultForm);
  const [idFiles, setIdFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const prop = await fetchPropertyById(propertyId);
        setProperty(prop);
        setForm((prev) => ({
          ...prev,
          personalDetails: {
            ...prev.personalDetails,
            firstName: user?.details?.firstName || prev.personalDetails.firstName,
            lastName: user?.details?.lastName || prev.personalDetails.lastName,
          },
          contactDetails: {
            ...prev.contactDetails,
            contactEmail: user?.details?.email || prev.contactDetails.contactEmail,
            contactNumber: user?.details?.mobileNumber || prev.contactDetails.contactNumber,
          },
        }));
      } catch (err) {
        setError(err.response?.data?.message || 'Property not found.');
      }
    };
    load();
  }, [propertyId, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await createApplication(propertyId, form, idFiles);
      setMessage('Application submitted successfully.');
      setTimeout(() => navigate('/customer/applications'), 1200);
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data || 'Failed to submit application.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout
      title="Apply for rent"
      subtitle={property ? getPropertyDisplayTitle(property) : `Property #${propertyId}`}
      navLinks={customerNav}
    >
      <Alert type="error" message={error} onClose={() => setError('')} />
      <Alert type="success" message={message} onClose={() => setMessage('')} />

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-6 space-y-6">
        <ApplicationForm form={form} onChange={setForm} onIdFilesChange={setIdFiles} />
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => navigate(`/property/${propertyId}`)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? 'Submitting...' : 'Submit application'}
          </button>
        </div>
      </form>
    </DashboardLayout>
  );
};

export default ApplyForRentPage;