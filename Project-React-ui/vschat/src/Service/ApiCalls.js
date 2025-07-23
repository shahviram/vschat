import axios from 'axios';

// API Common
const API_BASE_URL = 'http://localhost:8080/api';

// axios instance
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true,
    credentials: 'include'
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // You can modify config here before request is sent
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        // Ensure CORS headers are properly set
        config.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000';
        config.headers['Access-Control-Allow-Credentials'] = 'true';
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Response Error:', {
                data: error.response.data,
                status: error.response.status,
                headers: error.response.headers
            });
            const message = error.response.data?.message || 'Server error occurred';
            return Promise.reject(new Error(message));
        } else if (error.request) {
            // The request was made but no response was received
            // This could be a CORS issue or the server is not running
            console.error('Request Error:', error.request);
            return Promise.reject(new Error('Unable to connect to the server. Please check if the server is running.'));
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error:', error.message);
            return Promise.reject(new Error(error.message || 'An error occurred'));
        }
    }
);

// API endpoints
const endpoints = {
    login: {
        base: '/logins',
        auth: '/logins/auth',
    },
    register: {
        base: '/users'  // Updated to match backend endpoint
    },
    chat: {
        messages: '/chat/messages'
    },
    documents: {
        upload: '/documents/upload',
        myUploads: '/documents/my-uploads',
        download: '/documents/{id}/download',
        delete: '/documents/{id}',
        share: '/documents/{id}/share',
        sharedWithMe: '/documents/shared-with-me',
        removeSharing: '/documents/shared-with-me/{id}'
    }
};
// API methods
const apiMethods = {
    // GET request
    get: async (url) => {
        try {
            return await axiosInstance.get(url);
        } catch (error) {
            console.error('GET Request Error:', error);
            throw error;
        }
    },

    // POST request
    post: async (url, data) => {
        try {
            return await axiosInstance.post(url, data);
        } catch (error) {
            console.error('POST Request Error:', error);
            throw error;
        }
    },

    // PUT request
    put: async (url, data) => {
        try {
            return await axiosInstance.put(url, data);
        } catch (error) {
            console.error('PUT Request Error:', error);
            throw error;
        }
    },

    // DELETE request
    delete: async (url) => {
        try {
            return await axiosInstance.delete(url);
        } catch (error) {
            console.error('DELETE Request Error:', error);
            throw error;
        }
    }
};

// Combine all API services
const api = {
    // Chat functions
    getMessages: () => axiosInstance.get(endpoints.chat.messages),
    sendMessage: (message) => axiosInstance.post(endpoints.chat.messages, message),

    // Document management functions
    uploadDocument: (formData) => axiosInstance.post(endpoints.documents.upload, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    getMyDocuments: () => axiosInstance.get(endpoints.documents.myUploads),
    getSharedDocuments: () => axiosInstance.get(endpoints.documents.sharedWithMe),
    downloadDocument: (id) => axiosInstance.get(endpoints.documents.download.replace('{id}', id), {
        responseType: 'blob'
    }),
    deleteDocument: (id) => axiosInstance.delete(endpoints.documents.delete.replace('{id}', id)),
    shareDocument: (id, userIds) => axiosInstance.post(endpoints.documents.share.replace('{id}', id), userIds),
    removeSharing: (id) => axiosInstance.delete(endpoints.documents.removeSharing.replace('{id}', id)),

    // Login functions
    getAllLogins: () => apiMethods.get(endpoints.login.base),
    getLoginById: (id) => apiMethods.get(`${endpoints.login.base}/${id}`),
    authenticate: (loginData) => apiMethods.post(endpoints.login.auth, loginData),
    createLogin: (loginData) => apiMethods.post(endpoints.login.base, loginData),
    updateLogin: (id, loginData) => apiMethods.put(`${endpoints.login.base}/${id}`, loginData),
    deleteLogin: (id) => apiMethods.delete(`${endpoints.login.base}/${id}`),

    // Registration functions
    getAllUsers: () => apiMethods.get(endpoints.register.base),
    getUserById: (id) => apiMethods.get(`${endpoints.register.base}/${id}`),
    register: (userData) => {
        const registerUserDTO = {
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            country: userData.country,
            password: userData.password
        };
        return apiMethods.post(endpoints.register.base, registerUserDTO);
    },
    updateUser: (id, userData) => {
        const registerUserDTO = {
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            country: userData.country,
            password: userData.password
        };
        return apiMethods.put(`${endpoints.register.base}/${id}`, registerUserDTO);
    },
    deleteUser: (id) => apiMethods.delete(`${endpoints.register.base}/${id}`)
};

export { api };
