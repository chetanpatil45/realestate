import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import DashboardLayout from '../../components/DashboardLayout';
import Alert from '../../components/Alert';
import { fetchAccount, fetchProfile, updateAccount, updateProfile } from '../../api/services/userService';
import { getRoleHomePath, normalizeRole } from '../../utils/propertyHelpers';

const inputClass =
  'mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500';

const ProfilePage = () => {
  const { user, updateUserDetails } = useContext(AuthContext);
  const role = normalizeRole(user?.role);

  const [accountForm, setAccountForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
  });
  const [contactForm, setContactForm] = useState({
    contactNumber: '',
    contactEmail: '',
  });
  const [personalForm, setPersonalForm] = useState({
    firstName: '',
    lastName: '',
    title: '',
    dob: '',
  });
  const [profileImages, setProfileImages] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const [account, profile] = await Promise.all([fetchAccount(), fetchProfile()]);
        setAccountForm({
          firstName: account.firstName || '',
          lastName: account.lastName || '',
          email: account.email || '',
          mobileNumber: account.mobileNumber || '',
        });
        setContactForm({
          contactNumber: profile.contactDetails?.contactNumber || '',
          contactEmail: profile.contactDetails?.contactEmail || '',
        });
        setPersonalForm({
          firstName: profile.personalDetails?.firstName || '',
          lastName: profile.personalDetails?.lastName || '',
          title: profile.personalDetails?.title || '',
          dob: profile.personalDetails?.dob || '',
        });
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load profile.');
      }
    };
    load();
  }, []);

  const handleAccountSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await updateAccount(accountForm);
      updateUserDetails(accountForm);
      setMessage('Account updated successfully.');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update account.');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const payload = {
        contactDetails: contactForm,
        personalDetails: personalForm,
      };
      await updateProfile(payload, profileImages);
      setMessage('Profile updated successfully.');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  const navLinks =
    role === 'ADMIN'
      ? [{ to: '/admin', label: 'Dashboard' }]
      : role === 'DEALER'
        ? [{ to: '/dealer', label: 'Dashboard' }]
        : [{ to: '/customer', label: 'Browse' }];

  return (
    <DashboardLayout title="My Profile" subtitle="Update your account and profile information." navLinks={navLinks}>
      <Alert type="error" message={error} onClose={() => setError('')} />
      <Alert type="success" message={message} onClose={() => setMessage('')} />

      <div className="grid lg:grid-cols-2 gap-6">
        <form onSubmit={handleAccountSave} className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <h2 className="font-bold text-gray-900">Account</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">First name</label>
              <input className={inputClass} value={accountForm.firstName} onChange={(e) => setAccountForm({ ...accountForm, firstName: e.target.value })} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last name</label>
              <input className={inputClass} value={accountForm.lastName} onChange={(e) => setAccountForm({ ...accountForm, lastName: e.target.value })} required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" className={inputClass} value={accountForm.email} onChange={(e) => setAccountForm({ ...accountForm, email: e.target.value })} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mobile</label>
            <input className={inputClass} value={accountForm.mobileNumber} onChange={(e) => setAccountForm({ ...accountForm, mobileNumber: e.target.value })} required />
          </div>
          <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg">
            Save account
          </button>
        </form>

        <form onSubmit={handleProfileSave} className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <h2 className="font-bold text-gray-900">Profile details</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Personal first name</label>
              <input className={inputClass} value={personalForm.firstName} onChange={(e) => setPersonalForm({ ...personalForm, firstName: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Personal last name</label>
              <input className={inputClass} value={personalForm.lastName} onChange={(e) => setPersonalForm({ ...personalForm, lastName: e.target.value })} />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact number</label>
              <input className={inputClass} value={contactForm.contactNumber} onChange={(e) => setContactForm({ ...contactForm, contactNumber: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact email</label>
              <input type="email" className={inputClass} value={contactForm.contactEmail} onChange={(e) => setContactForm({ ...contactForm, contactEmail: e.target.value })} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Profile ID images (optional)</label>
            <input type="file" accept="image/*" multiple className="mt-1 text-sm" onChange={(e) => setProfileImages(Array.from(e.target.files || []))} />
          </div>
          <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg">
            Save profile
          </button>
        </form>
      </div>

      <div className="flex gap-4 text-sm">
        <Link to="/reset-password" className="text-blue-600 font-medium">
          Change password
        </Link>
        <Link to={getRoleHomePath(role)} className="text-gray-600">
          Back to dashboard
        </Link>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;