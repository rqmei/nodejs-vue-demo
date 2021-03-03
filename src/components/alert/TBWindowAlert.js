import Vue from "vue";

export default {
    /**
     *  显示弹框
     * */
    showCustomAlert(options, callBack) {
        if (Vue.prototype.$windowDialog) {
            Vue.prototype.$windowDialog.showWindowAlert(options, callBack);
        }
    },

    /**
     *  取消弹框
     * */
    dismissCustomAlert() {
        if (Vue.prototype.$windowDialog) {
            Vue.prototype.$windowDialog.dismissWindowAlert();
        }
    },

    /**
     * 显示三个按钮
     */
    showCustomThreeButtonAlert(options, callBack) {
        if (Vue.prototype.$windowThreeDialog) {
            Vue.prototype.$windowThreeDialog.showWindowThreeButtonAlert(options, callBack);
        }
    },
    /**
     * 取消三个按钮弹框
     */
    dimissCustomThreeButtonAlert() {
        if (Vue.prototype.$windowThreeDialog) {
            Vue.prototype.$windowThreeDialog.dimissCustomThreeButtonAlert();
        }
    }
};
