import HttpService from './htttp-service'
import jwt from 'jwt-decode'

class AuthService {
    constructor() {
        this.httpService = new HttpService()
        this.isLoggedIn = false;
        this.user = {}
    }
    login = (body) => {
        return this.httpService.post(`/api/users/login`, body).then(resp => {
            localStorage.setItem('token', JSON.stringify(resp.token))
            localStorage.setItem('user', JSON.stringify(resp.user))
            this.user = resp.user;
        });
    }
    signUp = (body) => {
        return this.httpService.post(`/api/users/signup`, body);
    }
    getLoginStatus = () => {
        try {
            const token = localStorage.getItem('token');
            const decoded = jwt(token);
            return true
        } catch (e) {
            this.logout()
            return false
        }
    }
    getCurrentUser = () => {
        return this.user = JSON.parse(localStorage.getItem('user'));
    }
    logout = () => {
        localStorage.clear()
        this.user = {};
        this.isLoggedIn = false;
    }
}

export default new AuthService()
