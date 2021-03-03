import "@babel/polyfill";
import Es6Promise from "es6-promise";

// 主要
import Vue from "vue";

import ElementUI from "element-ui";

// 框架
import App from "./App.vue";
import router from "./router.js";
import store from "./store";
import "./permission";
import "./utils/global/GlobalPrototype.js";
// 导入图标
import "./assets/icons";

// 用户导入
import * as filters from "./filters";
import * as directives from "./directives";

// 所有CSS
import "normalize.css/normalize.css";
import "./assets/scss/index.scss";
import "element-ui/lib/theme-chalk/index.css";

Es6Promise.polyfill();

// 注册全局过滤器
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});

// 注册全局指令
Object.keys(directives).forEach(key => {
    Vue.directive(key, directives[key]);
});

Vue.use(ElementUI, {
    // set element-ui default size
    size: "medium"
});

Vue.config.productionTip = false;

const VueObj = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");

export default VueObj;
