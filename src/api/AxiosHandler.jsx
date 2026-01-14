import axios from "axios";

const apiClient = axios.create({
   /* baseURL: 'https://api.energy-charts.info',*/
    baseURL : '/api',
    withCredentials: false
});
export const getTotalSolar = () =>{
    return apiClient.get('/public_power?country=de')
}
