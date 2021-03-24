import axios from 'axios'


class HTTPService {
    baseURL = 'http://localhost:4000';
    get = (url) => {
        return axios.get(`${this.baseURL}${url}`);
    }
    post = (url, body) => {
        return axios.post(`${this.baseURL}${url}`, JSON.stringify(body));
    }
    patch = (url, body) => {
        return axios.patch(`${this.baseURL}${url}`, JSON.stringify(body));
    }
    delete = (url) => {
        return axios.delete(`${this.baseURL}${url}`);
    }
}

export default HTTPService