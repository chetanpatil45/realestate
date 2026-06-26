export const PROPERTY_TYPES = ['UNIT', 'APARTMENT', 'HOUSE', 'STUDIO', 'BEDROOM', 'ENSUITE', 'OTHER'];
export const PROPERTY_STATUSES = ['AVAILABLE', 'UNAVAILABLE', 'DEPOSIT_TAKEN', 'ON_HOLD'];
export const BILL_TYPES = ['SHARED', 'SPLIT', 'INCLUDED', 'OTHER'];
export const APPLICATION_STATUSES = ['UNREAD', 'READ', 'APPROVED', 'REJECTED'];

export function normalizeRole(rawRole) {
  if (!rawRole) return 'CUSTOMER';
  const upper = String(rawRole).toUpperCase();
  if (upper.includes('ADMIN')) return 'ADMIN';
  if (upper.includes('DEALER')) return 'DEALER';
  if (upper.includes('CUSTOMER')) return 'CUSTOMER';
  if (upper.startsWith('ROLE_')) return upper.replace('ROLE_', '');
  return upper;
}

export function getRoleHomePath(role) {
  const normalized = normalizeRole(role);
  if (normalized === 'ADMIN') return '/admin';
  if (normalized === 'DEALER') return '/dealer';
  return '/customer';
}

export function getPropertyDisplayTitle(property) {
  if (!property) return 'Property';
  const type = property.propertyType ? `${property.propertyType} · ` : '';
  return `${type}${property.location || property.propertyOwnerName || `Property #${property.id}`}`;
}

export function formatPrice(price) {
  if (price == null) return '—';
  return Number(price).toLocaleString('en-IN');
}

/** Main listings only — excludes lease plans (child rows with parentId). */
export function getMainListings(properties) {
  return (properties || []).filter((p) => p.parentId == null);
}

export function sortPropertiesNewestFirst(properties) {
  return [...(properties || [])].sort((a, b) => (b.id ?? 0) - (a.id ?? 0));
}

export function filterProperties(properties, filters) {
  const {
    searchTerm = '',
    propertyType = '',
    status = '',
    minPrice = '',
    maxPrice = '',
    minRooms = '',
  } = filters;

  const term = searchTerm.trim().toLowerCase();

  return properties.filter((p) => {
    if (term) {
      const haystack = [
        p.location,
        p.description,
        p.propertyOwnerName,
        p.propertyType,
        p.status,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(term)) return false;
    }

    if (propertyType && p.propertyType !== propertyType) return false;
    if (status && p.status !== status) return false;
    if (minRooms && (p.numberOfRooms ?? 0) < Number(minRooms)) return false;

    const price = Number(p.price ?? 0);
    if (minPrice && price < Number(minPrice)) return false;
    if (maxPrice && price > Number(maxPrice)) return false;

    return true;
  });
}

export const defaultPropertyForm = {
  propertyOwnerName: '',
  location: '',
  description: '',
  numberOfRooms: 1,
  propertyType: 'APARTMENT',
  status: 'AVAILABLE',
  price: '',
  billType: 'INCLUDED',
  availableFrom: '',
  availableTill: '',
  feature: {
    bathrooms: 1,
    bedrooms: 1,
    lounges: 1,
    parking: 0,
  },
};

export function buildPropertyRequestPayload(form) {
  const payload = {
    propertyOwnerName: form.propertyOwnerName,
    location: form.location,
    description: form.description,
    numberOfRooms: Number(form.numberOfRooms),
    propertyType: form.propertyType,
    status: form.status,
    price: Number(form.price),
    billType: form.billType,
    feature: {
      bathrooms: Number(form.feature.bathrooms),
      bedrooms: Number(form.feature.bedrooms),
      lounges: Number(form.feature.lounges),
      parking: Number(form.feature.parking),
    },
  };

  if (form.availableFrom) {
    payload.availableFrom = new Date(form.availableFrom).toISOString();
  }
  if (form.availableTill) {
    payload.availableTill = new Date(form.availableTill).toISOString();
  }

  return payload;
}

export function propertyToForm(property) {
  if (!property) return { ...defaultPropertyForm };

  return {
    propertyOwnerName: property.propertyOwnerName || '',
    location: property.location || '',
    description: property.description || '',
    numberOfRooms: property.numberOfRooms ?? 1,
    propertyType: property.propertyType || 'APARTMENT',
    status: property.status || 'AVAILABLE',
    price: property.price ?? '',
    billType: property.billType || 'INCLUDED',
    availableFrom: property.availableFrom
      ? new Date(property.availableFrom).toISOString().slice(0, 16)
      : '',
    availableTill: property.availableTill
      ? new Date(property.availableTill).toISOString().slice(0, 16)
      : '',
    feature: {
      bathrooms: property.feature?.bathrooms ?? 1,
      bedrooms: property.feature?.bedrooms ?? 1,
      lounges: property.feature?.lounges ?? 1,
      parking: property.feature?.parking ?? 0,
    },
  };
}