/**
 * 本地存储管理类 localstorage
 */
export default {
    // 清楚key的白名单
    whiteKeyList: [],
    /**
     *  存放数据到storemanger
     *
     *  key: 存放key  string
     *  value: 存放的值   可以是string 也可以是json
     */
    saveDataToLocalStorage(key, source) {
        if (key == null || key.length == 0) return;
        let value = source;
        if (value == null) return;

        if (typeof value !== "string") {
            value = JSON.stringify(value);
        }
        localStorage.setItem(key, value);
    },

    /**
     * 从storemanger取出数据 - 字符串
     *
     *  key: 存放key  string
     */
    getDataWithLocalStorage(key, callBack) {
        if (key == null || key.length == 0) return;
        if (window.localStorage) {
            const item = localStorage.getItem(key);
            if (callBack) {
                callBack(item);
            }
            return item;
        }
    },
    /**
     * 从storemanger取出数据  - Object
     * @param key
     * @returns {string}
     */
    getObjectWithLocalStorage(key, callBack) {
        if (key == null || key.length == 0) return null;
        if (window.localStorage) {
            const str = localStorage.getItem(key);
            let item = null;
            if (str != null && str.length != 0) {
                item = JSON.parse(str);
            } else {
                item = null;
            }
            if (callBack) {
                callBack(item);
            }
            return item;
        }
    },
    /**
     * 获取所有的key
     */
    getStorageAllKeys(callBack) {
        if (window.localStorage) {
            // 移除所有
            const keyList = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                keyList.push(key);
            }
            if (callBack) {
                callBack(keyList);
            }
            return keyList;
        }
    },

    /**
     *  移除key
     */
    removeDataWithLocalStorage(key) {
        if (key == null || key.length === 0) return;

        // 拼接用户ID
        if (window.localStorage) {
            localStorage.removeItem(key);
        }
    },

    /**
     * 移除所有数据
     */
    removeAllDataWithLocalStorage() {
        if (window.localStorage) {
            // 移除所有
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                // 不存在白名单就移除
                if (!this.checkIsExitWhiteKeyListByKey(key)) {
                    this.removeDataWithLocalStorage(key);
                }
            }
        }
    },
    /**
     * 判断key是否在白名单中
     */
    checkIsExitWhiteKeyListByKey(key) {
        if (!key || key.length == 0) return false;
        if (!this.whiteKeyList || this.whiteKeyList.length == 0) return false;
        for (let i = 0; i < this.whiteKeyList.length; i++) {
            const whiteKey = this.whiteKeyList[i];
            if (whiteKey == key) {
                return true;
            }
        }
        return false;
    }
};
