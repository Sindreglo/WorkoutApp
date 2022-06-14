import axios from "axios";
import storageService from "@/services/storageService";

const apiClient = axios.create({
    baseURL: "http://localhost:8080/api",
    timeout: 1000,
    headers: {
        Accept: "application/json",
    },
});

apiClient.interceptors.request.use((config) => {
    let token = storageService.getToken();
    if (token != null) config.headers.Authorization = "Bearer " + token;
    return config;
});

export default {
    login(email, password) {
        let urlParameters  = "username="+email+"&password="+password;
        return apiClient.post("/login", urlParameters);
    },
    test() {
        return apiClient.get("/user");
    }
}
