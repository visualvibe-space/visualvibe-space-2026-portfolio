const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

class ApiService {
  constructor(baseUrl = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const config = {
      ...options,
      headers: {
        ...options.headers,
      },
    };

    if (options.body && options.body instanceof FormData) {
      config.body = options.body;
    } else if (options.body) {
      config.headers['Content-Type'] = 'application/json';
      config.body = JSON.stringify(options.body);
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }
      
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  get(endpoint) {
    return this.request(endpoint);
  }

  post(endpoint, body) {
    return this.request(endpoint, { method: 'POST', body });
  }

  put(endpoint, body) {
    return this.request(endpoint, { method: 'PUT', body });
  }

  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

export const api = new ApiService();

import { getImageUrl } from "../utils/image";

export { getImageUrl };

export const slidesApi = {
  getAll: () => api.get('/slides'),
  getById: (id) => api.get(`/slides/${id}`),
  create: (data) => api.post('/slides', data),
  update: (id, data) => api.put(`/slides/${id}`, data),
  delete: (id) => api.delete(`/slides/${id}`),
};

export const teamApi = {
  getAll: () => api.get('/team'),
  getById: (id) => api.get(`/team/${id}`),
  create: (data) => api.post('/team', data),
  update: (id, data) => api.put(`/team/${id}`, data),
  delete: (id) => api.delete(`/team/${id}`),
};

export const servicesApi = {
  getAll: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/services`);
      if (!response.ok) return null;
      const data = await response.json();
      return Array.isArray(data) ? data : null;
    } catch {
      return null;
    }
  },
};

export const websitesApi = {
  getAll: () => api.get('/websites'),
  getById: (id) => api.get(`/websites/${id}`),
  create: (data) => api.post('/websites', data),
  update: (id, data) => api.put(`/websites/${id}`, data),
  delete: (id) => api.delete(`/websites/${id}`),
};

export const logosApi = {
  getAll: () => api.get('/logos'),
  getById: (id) => api.get(`/logos/${id}`),
  create: (data) => api.post('/logos', data),
  update: (id, data) => api.put(`/logos/${id}`, data),
  delete: (id) => api.delete(`/logos/${id}`),
};

export const graphicsApi = {
  getAll: () => api.get('/graphics'),
  getById: (id) => api.get(`/graphics/${id}`),
  create: (data) => api.post('/graphics', data),
  update: (id, data) => api.put(`/graphics/${id}`, data),
  delete: (id) => api.delete(`/graphics/${id}`),
};

export const flyersApi = {
  getAll: () => api.get('/flyers'),
  getById: (id) => api.get(`/flyers/${id}`),
  create: (data) => api.post('/flyers', data),
  update: (id, data) => api.put(`/flyers/${id}`, data),
  delete: (id) => api.delete(`/flyers/${id}`),
};

export const uiuxApi = {
  getAll: () => api.get('/uiux'),
  getById: (id) => api.get(`/uiux/${id}`),
  create: (data) => api.post('/uiux', data),
  update: (id, data) => api.put(`/uiux/${id}`, data),
  delete: (id) => api.delete(`/uiux/${id}`),
};

export const videosApi = {
  getAll: () => api.get('/videos'),
  getById: (id) => api.get(`/videos/${id}`),
  create: (data) => api.post('/videos', data),
  update: (id, data) => api.put(`/videos/${id}`, data),
  delete: (id) => api.delete(`/videos/${id}`),
};

export const enquiriesApi = {
  getAll: (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    return api.get(`/enquiries${params ? '?' + params : ''}`);
  },
  getById: (id) => api.get(`/enquiries/${id}`),
  create: (data) => api.post('/enquiries', data),
  update: (id, data) => api.put(`/enquiries/${id}`, data),
  delete: (id) => api.delete(`/enquiries/${id}`),
};

export const authApi = {
  login: (username, password) => 
    api.post('/auth', { action: 'login', username, password }),
  logout: () => 
    api.post('/auth', { action: 'logout' }),
  check: () => 
    api.post('/auth', { action: 'check' }),
};

export const adminApi = {
  getStats: () => api.get('/admin?type=stats'),
};

export const uploadApi = {
  uploadImage: async (file, type = 'general') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    
    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
    });
    
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Upload failed');
    }
    return data;
  },
};

export default api;
