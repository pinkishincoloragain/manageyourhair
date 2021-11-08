import axios from "axios";

axios.defaults.withCredentials = true;

const API_URL = "http://localhost:8001/"

const signup = (firstName, lastName, contact, email, password) => {
    return axios.post(API_URL + 'api/signup', {
        firstName: firstName,
        lastName: lastName,
        contact: contact,
        id: email,
        pw: password
    });
};

const login = (email, password) => {
    return axios.post(API_URL + 'api/login', {
        id: email,
        pw: password
    })
    .then((response) => {
        if (response.data.accessToken) {
            localStorage.setItem("User", JSON.stringify(response.data));
        }
        return response.data;
    });
};

export default {
    signup,
    login,
};