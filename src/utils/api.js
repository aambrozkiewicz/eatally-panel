import { getToken } from "./auth";

export const apiUrl = process.env['REACT_APP_API_URL'];

export const authFetch = (path, {...rest}) => {
    return fetch(`${apiUrl}/${path}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`,
        },
        ...rest
    });
}