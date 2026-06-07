import API from '../axios';

export async function fetchLoggedInUser() {
  const response = await API.get('/api/v1/auth/user');
  return response.data;
}

export async function resetPassword(newPassword) {
  const response = await API.post('/api/v1/auth/resetPassword', { newPassword });
  return response.data;
}