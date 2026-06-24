import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import Alert from '../../components/Alert';
import ConfirmDialog from '../../components/ConfirmDialog';
import { fetchBookmarks, removeBookmark } from '../../api/services/customerService';
import { fetchPropertyById } from '../../api/services/propertyService';
import { getPropertyDisplayTitle, formatPrice } from '../../utils/propertyHelpers';
import { customerNav } from '../../utils/navConfig';
import { Bookmark, Trash2 } from 'lucide-react';

const BookmarksPage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [confirmId, setConfirmId] = useState(null);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const bookmarks = await fetchBookmarks({ amount: 100 });
      const enriched = await Promise.all(
        bookmarks.map(async (bookmark) => {
          try {
            const property = await fetchPropertyById(bookmark.propertyId);
            return { bookmark, property };
          } catch {
            return { bookmark, property: null };
          }
        })
      );
      setItems(enriched);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load bookmarks.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleRemove = async () => {
    if (!confirmId) return;
    try {
      await removeBookmark(confirmId);
      setConfirmId(null);
      await load();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to remove bookmark.');
      setConfirmId(null);
    }
  };

  return (
    <DashboardLayout title="My Bookmarks" subtitle="Saved properties you want to revisit." navLinks={customerNav}>
      <Alert type="error" message={error} onClose={() => setError('')} />

      {loading ? (
        <p className="text-gray-500 text-sm">Loading bookmarks...</p>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
          <Bookmark className="w-10 h-10 text-gray-300 mx-auto mb-2" />
          <p className="text-gray-500">You have no bookmarked properties yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map(({ bookmark, property }) => (
            <div
              key={bookmark.id}
              className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <h3 className="font-bold text-gray-900">
                  {property ? getPropertyDisplayTitle(property) : `Property #${bookmark.propertyId}`}
                </h3>
                {property && (
                  <p className="text-sm text-gray-500 mt-0.5">
                    {property.location} · ₹{formatPrice(property.price)}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => navigate(`/property/${bookmark.propertyId}`)}
                  className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
                >
                  View
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmId(bookmark.id)}
                  className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 inline-flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!confirmId}
        title="Remove bookmark?"
        message="This property will be removed from your saved list."
        confirmLabel="Remove"
        onConfirm={handleRemove}
        onCancel={() => setConfirmId(null)}
        danger
      />
    </DashboardLayout>
  );
};

export default BookmarksPage;