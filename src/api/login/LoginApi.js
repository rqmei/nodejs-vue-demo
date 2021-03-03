import http from "@tibi/http";

const loginBaseUrl = process.env.VUE_APP_API_SSO_URL;

export default {
    login(params) {
        return http.post(`/login`, params);
    },

    logout(params) {
        return http.post(`/logout`, params);
    }
};
