import { PROPERTY_TYPES, PROPERTY_STATUSES } from '../utils/propertyHelpers';

const PropertyFilters = ({ filters, onChange }) => {
  const set = (key, value) => onChange({ ...filters, [key]: value });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
      <input
        type="text"
        placeholder="Search location, description..."
        className="xl:col-span-2 w-full px-3 py-2 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
        value={filters.searchTerm}
        onChange={(e) => set('searchTerm', e.target.value)}
      />
      <select
        className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm bg-white"
        value={filters.propertyType}
        onChange={(e) => set('propertyType', e.target.value)}
      >
        <option value="">All types</option>
        {PROPERTY_TYPES.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
      <select
        className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm bg-white"
        value={filters.status}
        onChange={(e) => set('status', e.target.value)}
      >
        <option value="">All statuses</option>
        {PROPERTY_STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <input
        type="number"
        min="0"
        placeholder="Min price"
        className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm bg-white"
        value={filters.minPrice}
        onChange={(e) => set('minPrice', e.target.value)}
      />
      <input
        type="number"
        min="0"
        placeholder="Max price"
        className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm bg-white"
        value={filters.maxPrice}
        onChange={(e) => set('maxPrice', e.target.value)}
      />
      <input
        type="number"
        min="0"
        placeholder="Min rooms"
        className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm bg-white"
        value={filters.minRooms}
        onChange={(e) => set('minRooms', e.target.value)}
      />
    </div>
  );
};

export default PropertyFilters;