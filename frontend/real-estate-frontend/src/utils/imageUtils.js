/**
 * Converts API image payloads (byte[] as base64 string or number array) to a displayable URL.
 */
export function bytesToObjectUrl(imageData, mimeType = 'image/jpeg') {
  if (!imageData) return null;

  try {
    if (typeof imageData === 'string') {
      const base64 = imageData.startsWith('data:')
        ? imageData
        : `data:${mimeType};base64,${imageData}`;
      return base64;
    }

    if (Array.isArray(imageData)) {
      const uint8 = new Uint8Array(imageData);
      const blob = new Blob([uint8], { type: mimeType });
      return URL.createObjectURL(blob);
    }
  } catch {
    return null;
  }

  return null;
}

export function getImageMimeType(type, name) {
  if (type) return type;
  if (name?.toLowerCase().endsWith('.png')) return 'image/png';
  if (name?.toLowerCase().endsWith('.webp')) return 'image/webp';
  return 'image/jpeg';
}

export function revokeObjectUrl(url) {
  if (url && url.startsWith('blob:')) {
    URL.revokeObjectURL(url);
  }
}