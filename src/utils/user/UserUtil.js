import storex from "../../store/index.js";
import router from "../../router.js";
import LocalStorageManager from "../db/LocalStorageManager";
import StoreDB from "../db/StoreDB";
/**
 * 用户数据处理
 */
export default {
    /**
     * 登录
     */
    login(param) {
        const that = this;
        return new Promise(function(resolve, reject) {
            // 包含登录
            storex
                .dispatch("user/login", param)
                .then(res => {
                    if (res.success && res.code === 0) {
                        that.handleLoginSuccessData(res);
                    }
                    resolve(res);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },

    /**
     * 退出登录
     */
    logout() {
        const that = this;
        return new Promise(function(resolve, reject) {
            storex
                .dispatch("user/logout")
                .then(res => {
                    that.handleLogOutSuccessData();
                    resolve(res);
                })
                .catch(function(err) {
                    reject(err);
                });
        });
    },

    /**
     * 处理登录成功数据
     */
    handleLoginSuccessData(res) {
        const userData = res.data;
        console.log("登录成功------", res);
    },
    /**
     * 处理退出成功数据
     */
    handleLogOutSuccessData() {
        console.log("退出登录成功-------");
        this.removeLocationAllData();
        const { fullPath } = router.app.$route;
        router.push(`/login?redirect=${fullPath}`);
    },
    /**
     * 移除本地数据
     */
    removeLocationAllData() {
        LocalStorageManager.removeAllDataWithLocalStorage();
        StoreDB.removeAllStoreData();
    }
};
