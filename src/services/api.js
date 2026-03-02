import axios from 'axios';

const api = axios.create({
    baseURL: '', // Using Vite proxy
});

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('pg_token');
        if (token) {
            // Ensure headers object exists
            config.headers = config.headers || {};
            config.headers['Authorization'] = `Bearer ${token}`;
            console.log('API Request: Token attached', config.url);
        } else {
            console.warn('API Request: No token found for', config.url);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle 401s
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.error('Session expired or unauthorized');
            // Optional: Redirect to login or clear token
            // localStorage.removeItem('pg_token');
            // localStorage.removeItem('pg_user');
            // window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
