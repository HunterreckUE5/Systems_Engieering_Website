import axios from "axios";

const apiClient = axios.create({
    baseURL: 'https://api.energy-charts.info',
    headers: {
        'Content-Type': 'application/json',
    },
});
export const getTotalSolar = () =>{
    return apiClient.get('/public_power?country=de')
}

export const getAllPosts = () => {
    return apiClient.get('/posts');
};