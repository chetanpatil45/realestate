import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8081', // Replace with your Spring Boot URL if different
    headers: {
        'Content-Type': 'application/json',
    },
});

// This interceptor automatically attaches the JWT token to every request if it exists
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    const publicRoutes = [
        "/api/v1/auth/authenticate",
        "/api/v1/auth/register",
    ];

    const isPublic = publicRoutes.some(route =>
        config.url.includes(route)
    );

    if (!isPublic && token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

export default API;