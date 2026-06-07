import API from '../axios';

export async function fetchProperties(params = {}) {
  const { pageNumber, amount, sortBy } = params;
  const response = await API.get('/api/v1/properties/', {
    params: {
      ...(pageNumber != null && { pageNumber }),
      ...(amount != null && { amount }),
      ...(sortBy && { sortBy }),
    },
  });
  return response.data;
}

/** Loads all property pages (backend sorts ascending by id; newest are on later pages). */
export async function fetchAllProperties({ pageSize = 50, maxPages = 20 } = {}) {
  const all = [];
  for (let page = 0; page < maxPages; page += 1) {
    const batch = await fetchProperties({
      pageNumber: page,
      amount: pageSize,
      sortBy: 'id',
    });
    all.push(...batch);
    if (batch.length < pageSize) break;
  }
  return all;
}

export async function fetchPropertyById(propertyId) {
  const response = await API.get(`/api/v1/properties/${propertyId}`);
  return response.data;
}

export async function fetchPropertyImages(propertyId) {
  const response = await API.get(`/api/v1/properties/images/${propertyId}`);
  return response.data;
}