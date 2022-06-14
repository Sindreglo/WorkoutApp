import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:8080/api/login",
    timeout: 1000,
    headers: {
        Accept: "application/json",
    },
});

export default {
    login(email, password) {
        let urlParameters  = "username="+email+"&password="+password;
        return apiClient.post("", urlParameters);
    },
}
