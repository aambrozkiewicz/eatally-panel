import { getToken, removeToken } from "./auth";

export const apiUrl = process.env['REACT_APP_API_URL'];

export const client = async (endpoint, { body, ...config } = {}) => {
    const token = getToken();
    const headers = {
        'Content-Type': 'application/json',
        ...config.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    if (body) {
        config.body = JSON.stringify(body);
    }

    const response = await fetch(`${process.env['REACT_APP_API_URL']}/${endpoint}`, {
        method: config.method || 'GET',
        headers,
        ...config,
    });

    if (response.status === 401) {
        removeToken();
        window.location.assign(window.location);
        return;
    }

    if (response.status === 204) {
        return;
    }
    
    const data = await response.json();
    
    if (response.ok) {
        return data;
    } else {
        return Promise.reject(data);
    }
};
