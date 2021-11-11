import axios from "axios";

//axios.defaults.withCredentials = true;

const API_URL = "http://localhost:8001/"

const signup = (firstName, lastName, contact, email, password, password2) => {
    return axios.post(API_URL + 'api/signup', {
        firstName: firstName,
        lastName: lastName,
        contact: contact,
        id: email,
        pw: password,
        pw2: password2,
    })
    .then((response) => {
        if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
        };
        return response.data
    })
    .catch((error) => {
        console.log(error);
    });
};

const login = (email, password) => {
    return axios.post(API_URL + 'api/login', {
        id: email,
        pw: password
    })
    .then((response) => {
        // login success
        if (response.data.accessToken) {
            console.log('success');
            localStorage.setItem("user", JSON.stringify(response.data));
        };
    
        // login fail - validation fail
        if (response.data.errors) {
            console.log('validation Fail');
        }
        return response.data;
    })
    .catch((error) => {
        console.log(error);
    });
};

const logout = () => {
    localStorage.removeItem("user");
}
export default {
    signup,
    login,
    logout,
};