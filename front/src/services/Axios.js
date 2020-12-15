const axios = require("axios");
import { default as config } from "../config/index.js";
//import router from "../router";
import { default as store } from "@/store/index";

const axiosInstance = axios.create({
    baseURL: config.baseApi,
    timeout: 1000,
});
axiosInstance.interceptors.request.use(function(config) {
    const token = localStorage.getItem("jwt");
    config.headers.Authorization = "Bearer " + token;
    if (config.method != "get") store.dispatch("ldTrue");

    return config;
});
axiosInstance.interceptors.response.use(
    function(response) {
        if (response.config.method != "get") {
            store.dispatch("ldFalse");
            store.dispatch("appendNewMsg", {
                msg: response.data.message,
                variant: "success",
            });
        }
        return response;
    },
    function(error) {
        store.dispatch("ldFalse");

        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error

        if (error.response.status == 401) {
            localStorage.removeItem("jwt");
            //window.location.href = "/admin";
        } else {
            store.dispatch("appendNewMsg", {
                msg: error.response.data.message,
                variant: "danger",
            });
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;