import Vue from "vue";
import Constants from "../constants/Constants.js";
import EnumConstants from "../constants/EnumConstants.js";
import TagViewManager from "../route/TagViewManager.js";
import WindowDialog from "../../components/window-Dialog";

// 弹框
Vue.prototype.$windowDialog = WindowDialog.install();

// 返回常量命名
Vue.prototype.Constants = Constants;

// 事件总线
Vue.prototype.$EventBus = new Vue();

// 枚举常量
Vue.prototype.EnumConstants = EnumConstants;

// 关闭tab
Vue.prototype.removeTab = function(url) {
    TagViewManager.removeTab(url);
};
