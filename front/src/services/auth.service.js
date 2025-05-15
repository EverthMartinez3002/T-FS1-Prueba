import apiClient, { setAuthToken } from "./network.services";

const register = async (user) => {
    const response = await apiClient.post('/auth/register', user)
    if(response.data.token) {
        setAuthToken(response.data.token);
    }
    return response;
}

const login = async (user) => {
    const response = await apiClient.post('/auth/login', user);
    if (response.data.token) {
        setAuthToken(response.data.token);
    }
    return response;
}

export default {
    register,
    login
};