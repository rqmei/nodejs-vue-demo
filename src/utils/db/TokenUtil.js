import Cookies from "js-cookie";
import LocalStorageManager from "./LocalStorageManager.js";

const jsonWebToken = require("@tibi/json-web-token");

const TokenKey = "Tibi-Token";

// http 会使用
const localStorageKey = "token";

/**
 * token 处理
 */
export default {
    getToken() {
        let token = Cookies.get(TokenKey);
        if (!token) {
            token = LocalStorageManager.getDataWithLocalStorage(localStorageKey, token);
        }
        return token;
    },

    setToken(token) {
        if (token) {
            LocalStorageManager.saveDataToLocalStorage(localStorageKey, token);
        }
        return Cookies.set(TokenKey, token);
    },

    removeToken() {
        LocalStorageManager.removeDataWithLocalStorage(localStorageKey);
        return Cookies.remove(TokenKey);
    },

    /**
     * 获取token解析结果 - 是否失效 0未过期, 1即将过期, 2已过期 -1 不存在
     */
    getTokenExpiredResult() {
        const authorization = this.getToken();
        let result = -1;
        if (!authorization || authorization.length === 0) {
            result = -1;
            return result;
        }
        const expired = jsonWebToken.isExpired(authorization);
        result = expired;
        return result;
    }
};
