import axios from 'axios'


const AxiosInstance = axios.create({
    baseURL : "http://127.0.0.1:5000",
    headers : {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

const getAPI = (apiUrl,params) => AxiosInstance.get(apiUrl,params);

const postAPI = (apiUrl,data) => AxiosInstance.post(apiUrl, data);

const putAPI = (apiUrl, data,params) => AxiosInstance.put(apiUrl, data,params);

const deleteAPI = (apiUrl,data,params) => AxiosInstance.delete(apiUrl,data,params);

export { 
    postAPI,
    getAPI,
    putAPI,
    deleteAPI
};
export default AxiosInstance;