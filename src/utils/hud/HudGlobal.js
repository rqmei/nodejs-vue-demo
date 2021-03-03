import Vue from "vue";
import { Loading } from "element-ui";

/**
 *   功能: 全局弹框
 *
 *   使用方式:
 *   1. 导入文件import {HudGlobal} from "@/utils/HudGlobal.js";
 *   2. 调用方法  HudGlobal.showAlertMessage('测试');
 *   如果要使用点击确定之后回调 HudGlobal.showAlertMessage('测试').then(function)
 *
 *
 * */
const currentVue = null;

export default {
    /**
     * 显示 -确定 -弹框
     * @param message 消息名稱
     * @param func
     */
    showAlertMessage(message, func) {
        this.showAlertNoCloseMessage(message, true, func);
    },

    /**
     * 显示 -确定 -弹框
     * @param message
     * @param showClose
     * @param func
     */
    showAlertNoCloseMessage(message, showClose, func) {
        const msg = message && message.length > 0 ? message : "您确定要做此操作吗!";
        this.getVue().$alert(msg, "温馨提示", {
            showClose,
            confirmButtonText: "确定",
            callback: func
        });
    },

    /**
     * 显示-操作-confirm-确定弹框
     * @param message   弹框内容
     * @param cancleMsg 消失弹框信息
     *
     */
    showAlertConfirmMessage(message, cancleMsg) {
        return this.showAlertConfirmMessages(message, cancleMsg, "温馨提示");
    },

    /**
     * 显示-操作-confirm-确定弹框
     * @param message   弹框内容
     * @param cancleMsg 消失弹框信息
     *
     */
    showAlertConfirmMessages(message, cancleMsg, title) {
        const that = this;
        const msg = (message && message.length > 0) > 0 ? message : "您确定要做这个操作吗?";

        if (cancleMsg == null || cancleMsg == undefined) {
            cancleMsg = "取消成功";
        } else {
            cancleMsg = cancleMsg.length > 0 ? cancleMsg : "取消成功";
        }

        // 点击确定之后 -回调
        return new Promise((resolve, reject) => {
            that.getVue()
                .$confirm(msg, title, {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                .then(() => {
                    // 确定之后执行方法
                    if (resolve) {
                        resolve();
                    }
                })
                .catch(() => {
                    // 取消之后
                    // that.showInfoWithMessage(cancleMsg);
                });
        });
    },

    /**
     * 显示操作成功-hud
     * @param message
     */
    showSuccessWithMessage(message) {
        if (message == null || message == undefined) {
            message = "操作成功";
        }
        const msg = message.length > 0 ? message : "操作成功!";
        this.getVue().$message({
            type: "success",
            message: msg
        });
    },

    /**
     * \显示操作信息
     * @param message
     */
    showInfoWithMessage(message) {
        if (message == null || message == undefined) {
            message = "取消成功";
        }
        const msg = message.length > 0 ? message : "取消成功";
        this.getVue().$message({
            type: "info",
            message: msg
        });
    },

    /**
     * 显示操作失败-hud
     * @param message
     */
    showErrorWithMessage(message) {
        if (message == null || message == undefined) {
            message = "操作失败!";
        }
        const msg = message.length > 0 ? message : "操作失败!";
        this.getVue().$notify.error({
            title: "失败",
            message: msg
        });
    },

    /**
     * 显示信息
     * @param message
     */
    showMessage(message) {
        const msg = message && message.length > 0 ? message : "执行操作";
        this.getVue().$message({
            type: "info",
            message: msg
        });
    },

    /**
     * 显示警告信息
     * @param message
     */
    showWarningWithMessage(message) {
        const msg = message && message.length > 0 ? message : "取消成功";
        this.getVue().$message({
            type: "warning",
            message: msg
        });
    },

    /**
     * 加载数据
     * @param message
     */
    showLoadingFullScreen(message) {
        const msg = message == null || message.length == 0 ? "努力加载中" : message;
        const options = {
            fullscreen: true,
            text: msg,
            lock: true,
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
        };
        Loading.service(options);
    },

    /**
     * 加载动画关闭
     */
    dimissLoadingFullScreen() {
        const option = {};
        // 单例
        Loading.service(option).close();
    },

    /**
     * 获取当前vue
     * @returns {Vue | Vue}
     */
    getVue() {
        if (this.currentVue == null) {
            this.currentVue = new Vue();
        }
        return this.currentVue;
    }
};
