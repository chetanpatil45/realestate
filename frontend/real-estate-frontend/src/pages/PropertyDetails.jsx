    import { useEffect, useState, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IndianRupee, MapPin, Bookmark } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { fetchPropertyById, fetchPropertyImages } from '../api/services/propertyService';
import { addBookmark, fetchBookmarks } from '../api/services/customerService';
import PropertyImageGallery from '../components/PropertyImageGallery';
import Alert from '../components/Alert';
import { formatPrice, getPropertyDisplayTitle, normalizeRole } from '../utils/propertyHelpers';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const role = normalizeRole(user?.role);
  const isCustomer = role === 'CUSTOMER';

  const [property, setProperty] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [bookmarkedIds, setBookmarkedIds] = useState(new Set());

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const [prop, imgs] = await Promise.all([
          fetchPropertyById(id),
          fetchPropertyImages(id),
        ]);
        setProperty(prop);
        setImages(imgs);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load property details.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  useEffect(() => {
    if (!isCustomer) return;
    const loadBookmarks = async () => {
      try {
        const bookmarks = await fetchBookmarks();
        setBookmarkedIds(new Set(bookmarks.map((b) => b.propertyId)));
      } catch {
        /* optional */
      }
    };
    loadBookmarks();
  }, [isCustomer]);

  const handleBookmark = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!isCustomer) return;
    try {
      await addBookmark(id);
      setBookmarkedIds((prev) => new Set(prev).add(Number(id)));
      setMessage('Property bookmarked successfully.');
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data || 'Could not bookmark property.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading property...</div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <Alert type="error" message={error || 'Property not found.'} />
        <Link to="/" className="text-blue-600 text-sm mt-4 inline-block">Back to home</Link>
      </div>
    );
  }

  const title = getPropertyDisplayTitle(property);
  const isBookmarked = bookmarkedIds.has(Number(id));

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <Link to={isCustomer ? '/customer' : '/'} className="text-sm text-blue-600 font-medium">
          ← Back to listings
        </Link>

        <Alert type="error" message={error} onClose={() => setError('')} />
        <Alert type="success" message={message} onClose={() => setMessage('')} />

        <PropertyImageGallery images={images} />

        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-gray-900">{title}</h1>
              <div className="flex items-center text-gray-500 mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{property.location}</span>
              </div>
            </div>
            <div className="flex items-center text-2xl font-black text-blue-600">
              <IndianRupee className="w-5 h-5 stroke-[3]" />
              {formatPrice(property.price)}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {property.propertyType && (
              <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">{property.propertyType}</span>
            )}
            {property.status && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">{property.status}</span>
            )}
            {property.billType && (
              <span className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full">{property.billType}</span>
            )}
          </div>

          <p className="text-gray-600 leading-relaxed">{property.description}</p>

          <dl className="grid sm:grid-cols-2 gap-3 text-sm">
            <div><dt className="text-gray-500">Owner</dt><dd className="font-medium">{property.propertyOwnerName || '—'}</dd></div>
            <div><dt className="text-gray-500">Rooms</dt><dd className="font-medium">{property.numberOfRooms ?? '—'}</dd></div>
            {property.feature && (
              <>
                <div><dt className="text-gray-500">Bedrooms</dt><dd className="font-medium">{property.feature.bedrooms}</dd></div>
                <div><dt className="text-gray-500">Bathrooms</dt><dd className="font-medium">{property.feature.bathrooms}</dd></div>
                <div><dt className="text-gray-500">Lounges</dt><dd className="font-medium">{property.feature.lounges}</dd></div>
                <div><dt className="text-gray-500">Parking</dt><dd className="font-medium">{property.feature.parking}</dd></div>
              </>
            )}
          </dl>

          <div className="flex flex-wrap gap-3 pt-2">
            {isCustomer && (
              <>
                <button
                  type="button"
                  onClick={handleBookmark}
                  disabled={isBookmarked}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 disabled:opacity-60"
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-red-500 text-red-500' : ''}`} />
                  {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                </button>
                <button
                  type="button"
                  onClick={() => navigate(`/customer/apply/${id}`)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700"
                >
                  Apply for rent
                </button>
              </>
            )}
            {!user && (
              <Link to="/login" className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium">
                Sign in to apply
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;