import API from '../axios';

export async function fetchDealerProperties(params = {}) {
  const { pageNumber, amount, sortBy } = params;
  const response = await API.get('/api/v1/dealer/properties', {
    params: {
      ...(pageNumber != null && { pageNumber }),
      ...(amount != null && { amount }),
      ...(sortBy && { sortBy }),
    },
  });
  return response.data;
}

export async function fetchDealerPropertyById(propertyId) {
  const response = await API.get(`/api/v1/dealer/property/${propertyId}`);
  return response.data;
}

export async function addProperty(requestPayload, imageFiles = []) {
  const formData = new FormData();
  formData.append(
    'request',
    new Blob([JSON.stringify(requestPayload)], { type: 'application/json' })
  );
  imageFiles.forEach((file) => formData.append('images', file));

  const response = await API.post('/api/v1/dealer/property/add', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
}

export async function updateProperty(propertyId, requestPayload, imageFiles = []) {
  const formData = new FormData();
  formData.append('request', JSON.stringify(requestPayload));
  imageFiles.forEach((file) => formData.append('images', file));

  const response = await API.put(`/api/v1/dealer/property/${propertyId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
}

export async function deleteProperty(propertyId) {
  const response = await API.delete(`/api/v1/dealer/property/${propertyId}`);
  return response.data;
}

export async function fetchDealerPropertyImages(propertyId) {
  const response = await API.get(`/api/v1/dealer/property/images/${propertyId}`);
  return response.data;
}

export async function deletePropertyImage(imageId) {
  const response = await API.delete(`/api/v1/dealer/property/image/${imageId}`);
  return response.data;
}

export async function fetchDealerApplications() {
  const response = await API.get('/api/v1/dealer/applications');
  return response.data;
}

export async function approveApplication(applicationId) {
  const response = await API.post(`/api/v1/dealer/applications/approve/${applicationId}`);
  return response.data;
}

export async function rejectApplication(applicationId) {
  const response = await API.post(`/api/v1/dealer/applications/reject/${applicationId}`);
  return response.data;
}