import ArrayUtil from "./ArrayUtil.js";

export default {
    /**
     * @param {Object} json
     * @returns {Array}
     */
    param(json) {
        if (!json) return "";
        return ArrayUtil(
            Object.keys(json).map(key => {
                if (json[key] === undefined) return "";
                return `${encodeURIComponent(key)}=${encodeURIComponent(json[key])}`;
            })
        ).join("&");
    },

    /**
     * @param {string} url
     * @returns {Object}
     */
    param2Obj(url) {
        const search = url.split("?")[1];
        if (!search) {
            return {};
        }
        return JSON.parse(
            `{"${decodeURIComponent(search)
                .replace(/"/g, '\\"')
                .replace(/&/g, '","')
                .replace(/=/g, '":"')
                .replace(/\+/g, " ")}"}`
        );
    },

    /**
     * @param {string} url
     * @returns {Object}
     */
    getQueryObject(url) {
        // eslint-disable-next-line no-param-reassign
        url = url == null ? window.location.href : url;
        const search = url.substring(url.lastIndexOf("?") + 1);
        const obj = {};
        const reg = /([^?&=]+)=([^?&=]*)/g;
        search.replace(reg, (rs, $1, $2) => {
            const name = decodeURIComponent($1);
            let val = decodeURIComponent($2);
            val = String(val);
            obj[name] = val;
            return rs;
        });
        return obj;
    }
};
