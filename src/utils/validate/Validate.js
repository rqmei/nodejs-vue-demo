/**
 * 验证true代表通过, false代码未通过
 */
export default {
    isExternal(path) {
        return /^(https?:|mailto:|tel:)/.test(path);
    },

    validUsername(str) {
        // const userNameArr = ["super_admin"];
        const userNameReg = /^[a-zA-Z][a-zA-Z0-9_][_]{5,32}$/;
        const result = userNameReg.test(str);
        // const result = userNameArr.indexOf(str) === -1 && userNameReg.test(str);
        return result;
    },

    validPasswd(str) {
        // ^[a-zA-Z]w{5,17}$
        const passwdReg = /^[a-zA-Z][a-zA-Z0-9_\-,.?!@#$%^&*()]+$/;
        return passwdReg.test(str);
    },

    validChinese(str) {
        // ^[a-zA-Z]w{5,17}$
        const validReg = /^[\u4e00-\u9fa5]{0,}$/;
        return validReg.test(str);
    },

    validChineseName(str) {
        // ^[a-zA-Z]w{5,17}$
        const validReg = /^[\u4E00-\u9FA5]{1,20}$/;
        return validReg.test(str);
    },

    validPhone(str) {
        const validReg = /^1[345678]\d{9}$/;
        return validReg.test(str);
    },

    validURL(url) {
        const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
        return reg.test(url);
    },

    validIdCardSimple(str) {
        const reg = /^d{15}|d{}18$/;
        return reg.test(str);
    },

    validLowerCase(str) {
        const reg = /^[a-z]+$/;
        return reg.test(str);
    },

    validUpperCase(str) {
        const reg = /^[A-Z]+$/;
        return reg.test(str);
    },

    validAlphabets(str) {
        const reg = /^[A-Za-z]+$/;
        return reg.test(str);
    },

    validEmail(email) {
        // 为空时不验证
        if (!email) return true;
        // eslint-disable-next-line no-useless-escape
        const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return reg.test(email);
    },

    isString(str) {
        if (typeof str === "string" || str instanceof String) {
            return true;
        }
        return false;
    },
    isArray(arg) {
        if (typeof Array.isArray === "undefined") {
            return Object.prototype.toString.call(arg) === "[object Array]";
        }
        return Array.isArray(arg);
    },

    /**
     * 判断是否是对象
     */
    isObject(obj) {
        const result = Object.prototype.toString.call(obj) === "[object Object]";
        return result;
    },

    /**
     * 验证字符是否是数字
     * @param val
     * @returns {boolean}
     */
    isNumber(val) {
        const regPos = /^\d+(\.\d+)?$/; // 非负浮点数
        const regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; // 负浮点数
        if (regPos.test(val) || regNeg.test(val)) {
            return true;
        } else {
            return false;
        }
    },
    /**
     * 是否包含特殊符号
     */
    isContainerSpecifyKey(value) {
        const pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？ ]");
        if (pattern.test(value)) {
            return true;
        }
        return false;
    }
};
