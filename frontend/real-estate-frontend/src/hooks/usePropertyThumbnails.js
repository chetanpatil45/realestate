import { useEffect, useState } from 'react';
import { fetchPropertyImages } from '../api/services/propertyService';
import { bytesToObjectUrl, getImageMimeType, revokeObjectUrl } from '../utils/imageUtils';

export function usePropertyThumbnails(properties) {
  const [thumbnails, setThumbnails] = useState({});

  useEffect(() => {
    if (!properties?.length) {
      setThumbnails({});
      return;
    }

    let cancelled = false;
    const urlsToRevoke = [];

    const load = async () => {
      const entries = await Promise.all(
        properties.map(async (property) => {
          try {
            const images = await fetchPropertyImages(property.id);
            const first = images?.[0];
            if (!first?.image) return [property.id, null];
            const mime = getImageMimeType(first.type, first.name);
            const url = bytesToObjectUrl(first.image, mime);
            if (url?.startsWith('blob:')) urlsToRevoke.push(url);
            return [property.id, url];
          } catch {
            return [property.id, null];
          }
        })
      );

      if (!cancelled) {
        setThumbnails(Object.fromEntries(entries));
      }
    };

    load();

    return () => {
      cancelled = true;
      urlsToRevoke.forEach(revokeObjectUrl);
    };
  }, [properties]);

  return thumbnails;
}