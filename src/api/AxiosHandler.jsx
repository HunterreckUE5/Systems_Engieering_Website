import axios from "axios";

const apiClient = axios.create({
   /* baseURL: 'https://api.energy-charts.info',*/
    baseURL : '/api',
    withCredentials: false
});
export const getTotalSolar = () =>{
    return apiClient.get('/public_power?country=de')

       /* .then(function (response){
        console.log(response.data.production_types[16])
    }) .catch(function (error) {
        // handle error
        console.log(error);
    })
        .finally(function () {
            // always executed
        });*/
}
