import storex from "../../store/index.js";
import ObjectUtil from "../supplement/ObjectUtil";
import Constants from "../constants/Constants";
import LocalStorageManager from "../db/LocalStorageManager";
/**
 * 用户数据管理类
 */
export default {
    /**
     * 获取用户id
     */
    getUserId() {
        const userInfo = this.getCurrentUserInfo();
        if (userInfo) {
            const { userId } = userInfo;
            return userId;
        } else {
            return null;
        }
    },
    /**
     * 获取orgId
     */
    getCurrentOrgId() {
        const userInfo = this.getCurrentUserInfo();
        if (userInfo) {
            const { orgId } = userInfo;
            return orgId;
        } else {
            return null;
        }
    },
    /**
     * 获取useName
     */
    getCurrentRealName() {
        const userInfo = this.getCurrentUserInfo();
        if (userInfo) {
            const { realName } = userInfo;
            return realName;
        } else {
            return "";
        }
    },
    /**
     * 获取组织类型
     */
    getCurrentTypeCode() {
        const userInfo = this.getCurrentUserInfo();
        if (userInfo) {
            const { typeCode } = userInfo;
            return typeCode;
        } else {
            return "";
        }
    },
    /**
     * 用户头像
     */
    getCurrentUserFaceUrl() {
        const userInfo = this.getCurrentUserInfo();
        if (userInfo) {
            const { faceUrl } = userInfo;
            return faceUrl;
        } else {
            return "";
        }
    },
    /**
     * 获取用户信息
     */
    getCurrentUserInfo() {
        let userInfo = storex.getters.userData;
        if (!userInfo || ObjectUtil.isEmptyObject(userInfo)) {
            const user = this.getCurrentUser();
            userInfo = user;
        }
        return userInfo;
    },
    /**
     * 获取当前登录用户数据
     */
    getCurrentUser() {
        const key = Constants.globalLocalStorageKeys.GLOBAL_STATE_DATA_KEY;
        const data = LocalStorageManager.getObjectWithLocalStorage(key);
        if (!ObjectUtil.isEmptyObject(data)) {
            const { user } = data;
            return user;
        }
    }
};
