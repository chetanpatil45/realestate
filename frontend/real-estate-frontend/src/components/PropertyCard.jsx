import { MapPin, IndianRupee, Bookmark, ArrowUpRight } from 'lucide-react';

const PropertyCard = ({ property, onBookmark, onClick }) => {
  const { id, title, description, price, location, imageUrl } = property;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all group flex flex-col h-full">
      {/* Property Image Container */}
      <div className="relative aspect-video w-full bg-gray-100 overflow-hidden">
        <img 
          src={imageUrl || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80"} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Absolute Badges */}
        <button 
          onClick={(e) => {
            e.stopPropagation(); // Prevents opening details page when clicking bookmark
            onBookmark(id);
          }}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-xs rounded-full text-gray-600 hover:text-red-500 hover:bg-white shadow-xs transition-all"
        >
          <Bookmark className="w-4 h-4" />
        </button>
      </div>

      {/* Card Content body */}
      <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
        <div className="space-y-2">
          {/* Price Tag */}
          <div className="flex items-center text-xl font-black text-blue-600">
            <IndianRupee className="w-4 h-4 stroke-[3]" />
            <span>{price.toLocaleString('en-IN')}</span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-gray-900 text-lg line-clamp-1 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>

          {/* Location */}
          <div className="flex items-center text-sm text-gray-500 space-x-1">
            <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
            <span className="line-clamp-1">{location}</span>
          </div>

          {/* Description Snippet */}
          <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed pt-1">
            {description}
          </p>
        </div>

        {/* Action Button */}
        <button 
          onClick={() => onClick(id)}
          className="w-full flex items-center justify-center space-x-2 py-2.5 bg-gray-50 hover:bg-blue-600 text-gray-700 hover:text-white font-medium rounded-xl border border-gray-200 hover:border-blue-600 transition-all text-sm group/btn"
        >
          <span>View Details</span>
          <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover/btn:text-white transition-colors" />
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;