import axios from "axios";

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

export default {
    signup,
};