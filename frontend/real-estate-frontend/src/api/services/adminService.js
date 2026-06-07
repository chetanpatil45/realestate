import API from '../axios';

export async function adminTest() {
  const response = await API.get('/api/v1/admin/test');
  return response.data;
}

export async function fetchAllAccounts() {
  const response = await API.get('/api/v1/admin/user-management');
  return response.data;
}

export async function fetchAccountById(userId) {
  const response = await API.get(`/api/v1/admin/user-management/${userId}`);
  return response.data;
}

export async function deleteAccount(userId) {
  const response = await API.delete(`/api/v1/admin/user-management/${userId}`);
  return response.data;
}

export async function banAccount(userId, bannedTill) {
  const response = await API.post(`/api/v1/admin/user-management/ban/${userId}`, bannedTill);
  return response.data;
}

export async function unbanAccount(userId) {
  const response = await API.post(`/api/v1/admin/user-management/unban/${userId}`);
  return response.data;
}

export async function fetchAllProfiles() {
  const response = await API.get('/api/v1/admin/user-management/profiles');
  return response.data;
}