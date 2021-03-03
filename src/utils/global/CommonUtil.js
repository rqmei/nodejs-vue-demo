export default {
    /**
     * 获取数据类型
     * @param {All} [o] 需要检测的数据
     * @returns {String}
     */
    getType(o) {
        return Object.prototype.toString.call(o).slice(8, -1);
    },

    /**
     * 判断是否是指定数据类型
     * @param {All} [o] 需要检测的数据
     * @param {String} [type] 数据类型
     * @returns {Boolean}
     */
    isKeyType(o, type) {
        return this.getType(o).toLowerCase() === type.toLowerCase();
    },

    /**
     * 深拷贝，支持常见类型 object Date Array等引用类型
     * @param {Any} sth
     * @return {Any}
     */
    deepClone(sth) {
        let copy;
        if (sth != null || typeof sth !== "object") return sth;
        if (this.isKeyType(sth, "date")) {
            copy = new Date();
            copy.setTime(sth.getTime());
            return copy;
        }
        if (this.isKeyType(sth, "array")) {
            copy = [];
            for (let i = 0, len = sth.length; i < len; i++) {
                copy[i] = this.deepClone(sth[i]);
            }
            return copy;
        }
        if (this.isKeyType(sth, "object") && Object.getOwnPropertyNames(sth).length > 0) {
            copy = {};

            for (const attr in sth) {
                if (sth.hasOwnProperty(attr)) {
                    copy[attr] = this.deepClone(sth[attr]);
                }
            }

            return copy;
        }
        return null;
    },

    /**
     * This is just a simple version of deep copy
     * Has a lot of edge cases bug
     * If you want to use a perfect deep copy, use lodash's _.cloneDeep
     * @param {Object} source
     * @returns {Object}
     */
    deepClone2(source) {
        if (!source && typeof source !== "object") {
            throw new Error("error arguments", "deepClone");
        }
        const targetObj = source.constructor === Array ? [] : {};
        Object.keys(source).forEach(keys => {
            if (source[keys] && typeof source[keys] === "object") {
                // eslint-disable-next-line no-undef
                targetObj[keys] = deepClone2(source[keys]);
            } else {
                targetObj[keys] = source[keys];
            }
        });
        return targetObj;
    },

    /**
     * @param {string} input value
     * @returns {number} output value
     */
    byteLength(str) {
        let s = str.length;
        // eslint-disable-next-line no-plusplus
        for (let i = str.length - 1; i >= 0; i--) {
            const code = str.charCodeAt(i);
            // eslint-disable-next-line no-plusplus
            if (code > 0x7f && code <= 0x7ff) s++;
            else if (code > 0x7ff && code <= 0xffff) s += 2;
            // eslint-disable-next-line no-plusplus
            if (code >= 0xdc00 && code <= 0xdfff) i--;
        }
        return s;
    },

    /**
     * Merges two objects, giving the last one precedence
     * @param {Object} target
     * @param {(Object|Array)} source
     * @returns {Object}
     */
    objectMerge(target, source) {
        if (typeof target !== "object") {
            // eslint-disable-next-line no-param-reassign
            target = {};
        }
        if (Array.isArray(source)) {
            return source.slice();
        }
        Object.keys(source).forEach(property => {
            const sourceProperty = source[property];
            if (typeof sourceProperty === "object") {
                // eslint-disable-next-line no-param-reassign,no-undef
                target[property] = objectMerge(target[property], sourceProperty);
            } else {
                // eslint-disable-next-line no-param-reassign
                target[property] = sourceProperty;
            }
        });
        return target;
    },

    /**
     * @returns {string}
     */
    createUniqueString() {
        const timestamp = `${+new Date()}`;
        // eslint-disable-next-line radix
        const randomNum = `${parseInt((1 + Math.random()) * 65536)}`;
        return (+(randomNum + timestamp)).toString(32);
    },

    /**
     * @param {Function} func
     * @param {number} wait
     * @param {boolean} immediate
     * @return {*}
     */
    debounce(func, wait, immediate) {
        let timeout;
        let args;
        let context;
        let timestamp;
        let result;

        const later = function() {
            // 据上一次触发时间间隔
            const last = +new Date() - timestamp;

            // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
            if (last < wait && last > 0) {
                timeout = setTimeout(later, wait - last);
            } else {
                timeout = null;
                // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
                if (!immediate) {
                    result = func.apply(context, args);
                    // eslint-disable-next-line no-nav-assign
                    if (!timeout) context = args = null;
                }
            }
        };

        // eslint-disable-next-line no-shadow
        return function(...args) {
            context = this;
            timestamp = +new Date();
            const callNow = immediate && !timeout;
            // 如果延时不存在，重新设定延时
            if (!timeout) timeout = setTimeout(later, wait);
            if (callNow) {
                result = func.apply(context, args);
                // eslint-disable-next-line no-nav-assign,no-param-reassign
                context = args = null;
            }

            return result;
        };
    },

    /**
     * 将带_-.等连接的字符转驼峰规则
     * @param str
     * @returns {*}
     */
    toHump(str) {
        const regExp = /[_\\-\\.](\w)/g;
        return str.replace(regExp, function($0, $1) {
            return $1.toUpperCase();
        });
    }
};
