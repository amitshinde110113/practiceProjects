import axios from 'axios'
import authService from '../Serivces/auth-service'

axios.interceptors.request.use(function (config) {

    // Do something before request is sent

    config.headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': `jwt ${JSON.parse(localStorage.getItem('token'))}`
    }
    config.validateStatus = () => true;
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    if (response.status >= 299) {
        authService.logout()
        throw new Error(response.data.message);
    } else {
        response = response.data
    }

    return response;
}, function (error) {
    return Promise.reject(error);
});
