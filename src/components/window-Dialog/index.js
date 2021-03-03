import Vue from "vue";
import WindowDialog from "./WindowDialog.vue";

const WindowDialogExtend = Vue.extend(WindowDialog);
WindowDialog.install = options => {
    // 1. 实例化 挂载
    const instance = new WindowDialogExtend({
        data: options
    }).$mount();

    // 2.增加组件到出口
    document.body.appendChild(instance.$el);

    // 3.添加全局方法或属性
    Vue.windowShow = function() {
        instance.windowShow();
    };

    return instance;
};

export default WindowDialog;
