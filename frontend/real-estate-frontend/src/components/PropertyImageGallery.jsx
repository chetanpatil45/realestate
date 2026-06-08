import { useEffect, useState } from 'react';
import { bytesToObjectUrl, getImageMimeType, revokeObjectUrl } from '../utils/imageUtils';

const PropertyImageGallery = ({ images = [], loading }) => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const built = images
      .map((img) => {
        const mime = getImageMimeType(img.type, img.name);
        return bytesToObjectUrl(img.image, mime);
      })
      .filter(Boolean);
    setUrls(built);

    return () => {
      built.forEach(revokeObjectUrl);
    };
  }, [images]);

  if (loading) {
    return (
      <div className="aspect-video bg-gray-200 rounded-2xl animate-pulse" />
    );
  }

  if (!urls.length) {
    return (
      <img
        src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80"
        alt="Property"
        className="w-full aspect-video object-cover rounded-2xl"
      />
    );
  }

  if (urls.length === 1) {
    return (
      <img src={urls[0]} alt="Property" className="w-full aspect-video object-cover rounded-2xl" />
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
      {urls.map((url, index) => (
        <img
          key={index}
          src={url}
          alt={`Property ${index + 1}`}
          className={`object-cover rounded-xl ${index === 0 ? 'col-span-2 row-span-2 aspect-video' : 'aspect-square'}`}
        />
      ))}
    </div>
  );
};

export default PropertyImageGallery;