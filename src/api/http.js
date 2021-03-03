import HudGlobal from "../utils/hud/HudGlobal.js";
import GlobalHelper from "../utils/tool/GlobalHelper.js";
import http from "@tibi/http";
import CodeConstants from "../utils/constants/CodeConstants.js";
import TBWindowAlert from "../components/alert/TBWindowAlert.js";
import UseUtils from "../utils/user-util/UserUtil.js";

const baseUrl = process.env.VUE_APP_API_BASE_URL;

const loginBaseUrl = process.env.VUE_APP_API_SSO_URL;

const config = {
    baseUrl,
    token: true,
    supportLocalStorageToken: true,
    tokenRefreshUrl: `${loginBaseUrl}/token/refresh`,
    tokenExpireTip() {
        if (!window.tokenExpiredTip) {
            window.tokenExpiredTip = true;
            // access token过期
            HudGlobal.dimissLoadingFullScreen();
            HudGlobal.showAlertMessage("登录已过期, 请重新登录!", function() {
                UseUtils.logout().then(res => {});
            });
        }
    }
};

const onceConfig = {
    baseUrl,
    token: false,
    supportLocalStorageToken: true
};
http.init(config);

export default {
    /**
     * get 请求
     * @param url
     * @param param
     * isWeb 是否是web，不需要弹框处理
     * @returns {*}
     */
    get(url, param, opts, isWeb) {
        const that = this;
        return new Promise((resolve, reject) => {
            http.get(url, param, opts)
                .then(response => {
                    that.handleRequestSuccessResponse(resolve, response, isWeb);
                })
                .catch(error => {
                    that.handleRequestFailerResponse(resolve, error);
                });
        });
    },
    /**
     * get 请求 0 - 不需要token校验
     * @param url
     * @param param
     * isWeb 是否是web，不需要弹框处理
     * @returns {*}
     */
    getOnce(url, param, opts, isWeb) {
        const that = this;
        return new Promise((resolve, reject) => {
            http.once(onceConfig)
                .get(url, param, opts)
                .then(response => {
                    that.handleRequestSuccessResponse(resolve, response, isWeb);
                })
                .catch(error => {
                    that.handleRequestFailerResponse(resolve, error);
                });
        });
    },

    /**
     * post 请求
     * @param url
     * @param param
     * @returns {*}
     */
    post(url, param) {
        const that = this;
        return new Promise((resolve, reject) => {
            http.post(url, param)
                .then(response => {
                    that.handleRequestSuccessResponse(resolve, response);
                })
                .catch(error => {
                    that.handleRequestFailerResponse(resolve, error);
                });
        });
    },
    /**
     * post 请求 - 不需要token校验
     * @param url
     * @param param
     * @returns {*}
     */
    postOnce(url, param) {
        const that = this;
        return new Promise((resolve, reject) => {
            http.once(onceConfig)
                .post(url, param)
                .then(response => {
                    that.handleRequestSuccessResponse(resolve, response);
                })
                .catch(error => {
                    that.handleRequestFailerResponse(resolve, error);
                });
        });
    },

    /**
     * put 请求
     * @param url
     * @param parm
     * @returns {*}
     */
    put(url, param) {
        const that = this;
        return new Promise((resolve, reject) => {
            http.put(url, param)
                .then(response => {
                    that.handleRequestSuccessResponse(resolve, response);
                })
                .catch(error => {
                    that.handleRequestFailerResponse(resolve, error);
                });
        });
    },
    /**
     * put 请求  - 不需要token校验
     * @param url
     * @param parm
     * @returns {*}
     */
    putOnce(url, param) {
        const that = this;
        return new Promise((resolve, reject) => {
            http.once(onceConfig)
                .put(url, param)
                .then(response => {
                    that.handleRequestSuccessResponse(resolve, response);
                })
                .catch(error => {
                    that.handleRequestFailerResponse(resolve, error);
                });
        });
    },

    /**
     * 删除请求
     * @param url
     * @param param
     * @returns {*}
     */
    delete(url, param) {
        const that = this;
        return new Promise((resolve, reject) => {
            http.delete(url, param)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    resolve(error);
                });
        });
    },
    /**
     * 删除请求 - 不需要token校验
     * @param url
     * @param param
     * @returns {*}
     */
    deleteOnce(url, param) {
        const that = this;
        return new Promise((resolve, reject) => {
            http.once(onceConfig)
                .delete(url, param)
                .then(response => {
                    that.handleRequestSuccessResponse(resolve, response);
                })
                .catch(error => {
                    that.handleRequestFailerResponse(resolve, error);
                });
        });
    },

    // ====================================请求响应统一处理==============================//
    /**
     * 请求成功处理
     */
    handleRequestSuccessResponse(resolve, response, isWeb) {
        // 1.多端登录,不同的处理
        if (response && response.hasOwnProperty("code") && response.code === CodeConstants.LOGIN_MORE_DEVICE_CODE) {
            HudGlobal.dimissLoadingFullScreen();
            // 有验证失效弹框不处理
            if (window.tokenExpiredTip) {
                return;
            }
            const message = response.description ? response.description : "您的帐号已在其它地方登录";
            // 是H5页面直接简单提示，不弹框
            if (isWeb) {
                HudGlobal.showWarningWithMessage(message);
                return;
            }
            const options = {
                isContainerCancel: false,
                ensureButtonTitle: "关闭窗口",
                content: message
            };
            TBWindowAlert.showCustomAlert(options, function(item) {
                UseUtils.logout().then(res => {});
            });
            return;
        }
        // 2.登陆失效
        if (response && response.hasOwnProperty("code") && (response.code === 12611 || response.code === 105 || response.code === 18009)) {
            HudGlobal.dimissLoadingFullScreen();
            // 有验证失效弹框不处理
            if (window.tokenExpiredTip) {
                return;
            }
            const message = "登陆已失效，请重新登录";
            // 是H5页面直接简单提示，不弹框
            if (isWeb) {
                HudGlobal.showWarningWithMessage(message);
                return;
            }
            const options = {
                // isContainerCancel: true,
                ensureButtonTitle: "关闭窗口",
                content: message
                // cancelButtonTitle: "关闭窗口",
            };
            TBWindowAlert.showCustomAlert(options, function(item) {
                UseUtils.logout().then(res => {});
            });
            return;
        }

        if (response) {
            if (resolve) {
                resolve(response);
            }
        } else {
            this.handleRequestFailerResponse(resolve);
        }
    },
    /**
     * 请求失败处理
     */
    handleRequestFailerResponse(resolve, error) {
        HudGlobal.dimissLoadingFullScreen();
        const object = {
            success: false,
            fail: true,
            description: "网络连接失败",
            code: CodeConstants.NETWORK_ERROR
        };
        if (resolve) {
            resolve(object);
        }
    }
};
