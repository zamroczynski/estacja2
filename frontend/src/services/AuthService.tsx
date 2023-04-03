import API_URL from '../../config.json';


class AuthService {
    login(username: string, password: string) {
        console.log(API_URL);
        if (username === password) {
            localStorage.setItem("user", JSON.stringify('{"token": "ok"}'));
        }
    }

    logout() {
        localStorage.removeItem("user");
    }

    getCurrentUser() {
        const userStr = localStorage.getItem("user");
        if (userStr) return JSON.parse(userStr);
    }
}

export default new AuthService();