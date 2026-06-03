import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import PropertyCard from '../components/PropertyCard';
import API from '../api/axios';
import { Home, LogOut, Building, Search } from 'lucide-react';

const CustomerDashboard = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch properties from your Spring Boot Endpoint: /api/v1/customer/properties [GET]
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await API.get('/api/v1/customer/properties');
        setProperties(response.data);
      } catch (err) {
        setError('Failed to fetch property listings. Ensure your backend is running.');
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  // Handle Bookmarking: /api/v1/customer/bookmark/add/{propertyId} [POST]
  const handleBookmark = async (propertyId) => {
    try {
      await API.post(`/api/v1/customer/bookmark/add/${propertyId}`);
      alert('Property bookmarked successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Could not bookmark property');
    }
  };

  // Filter properties based on search query
  const filteredProperties = properties.filter(p => 
    p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      
      {/* Dashboard Top Navigation */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-blue-600 text-white rounded-lg">
              <Building className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">Marketplace Portal</span>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={logout}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Welcome Banner & Search Utility */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-xs">
          <div>
            <h1 className="text-2xl font-black text-gray-900">Explore Properties</h1>
            <p className="text-gray-500 text-sm mt-0.5">Discover premium direct listings verified by our system filters.</p>
          </div>

          {/* Local Text Filter Search Bar */}
          <div className="relative max-w-md w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text"
              placeholder="Search city, locality, or title..."
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-gray-50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Error Handling */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Loading State Skeleton */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(n => (
              <div key={n} className="bg-white rounded-2xl border border-gray-100 p-4 h-80 animate-pulse space-y-4">
                <div className="bg-gray-200 aspect-video rounded-xl w-full" />
                <div className="h-4 bg-gray-200 rounded-md w-2/3" />
                <div className="h-4 bg-gray-200 rounded-md w-1/2" />
              </div>
            ))}
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <Home className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No verified properties found matching your criteria.</p>
          </div>
        ) : (
          /* Responsive Layout Property Grid View */
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <PropertyCard 
                key={property.id} 
                property={property} 
                onBookmark={handleBookmark}
                onClick={(id) => navigate(`/property/${id}`)} // Routes to details screen
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default CustomerDashboard;