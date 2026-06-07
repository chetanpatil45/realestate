import API from '../axios';

export async function fetchAccount() {
  const response = await API.get('/api/v1/user/');
  return response.data;
}

export async function updateAccount(payload) {
  const response = await API.post('/api/v1/user/', payload);
  return response.data;
}

export async function fetchProfile() {
  const response = await API.get('/api/v1/user/profile');
  return response.data;
}

export async function updateProfile(requestPayload, imageFiles = []) {
  const formData = new FormData();
  formData.append(
    'request',
    new Blob([JSON.stringify(requestPayload)], { type: 'application/json' })
  );
  (imageFiles || []).forEach((file) => formData.append('images', file));

  const response = await API.post('/api/v1/user/profile', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
}

export async function updateProfileAvatar(imageFile) {
  const formData = new FormData();
  formData.append('image', imageFile);

  const response = await API.post('/api/v1/user/profile/avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
}

export async function fetchProfileAvatar() {
  const response = await API.get('/api/v1/user/profile/avatar');
  return response.data;
}