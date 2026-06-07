import API from '../axios';

export async function addBookmark(propertyId) {
  const response = await API.post(`/api/v1/customer/bookmarks/add/${propertyId}`);
  return response.data;
}

export async function fetchBookmarks(params = {}) {
  const { pageNumber, amount, sortBy } = params;
  const response = await API.get('/api/v1/customer/bookmarks', {
    params: {
      ...(pageNumber != null && { pageNumber }),
      ...(amount != null && { amount }),
      ...(sortBy && { sortBy }),
    },
  });
  return response.data;
}

export async function removeBookmark(bookmarkId) {
  const response = await API.delete(`/api/v1/customer/bookmarks/${bookmarkId}`);
  return response.data;
}

export async function createApplication(propertyId, requestPayload, imageFiles = []) {
  const formData = new FormData();
  formData.append(
    'request',
    new Blob([JSON.stringify(requestPayload)], { type: 'application/json' })
  );
  imageFiles.forEach((file) => formData.append('images', file));

  const response = await API.post(
    `/api/v1/customer/applications/create/${propertyId}`,
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
  return response.data;
}

export async function fetchApplications() {
  const response = await API.get('/api/v1/customer/applications');
  return response.data;
}

export async function fetchApplicationById(applicationId) {
  const response = await API.get(`/api/v1/customer/applications/${applicationId}`);
  return response.data;
}

export async function withdrawApplication(applicationId) {
  const response = await API.delete(`/api/v1/customer/applications/${applicationId}`);
  return response.data;
}

export async function fetchApplicationImages(applicationId) {
  const response = await API.get(`/api/v1/customer/applications/images/${applicationId}`);
  return response.data;
}