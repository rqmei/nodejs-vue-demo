import Vue from "vue";
import VueRouter from "vue-router";

import RoutesManager from "./utils/route/RoutesManager.js";

Vue.use(VueRouter);

// 重写路由的push方法 - 解决重复面包屑重复路由问题lzb
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error);
};

const createRouter = () =>
    new VueRouter({
        // hash 默认,访问路径带#号 history,不带#号,但需要服务器的支持
        mode: "hash",
        scrollBehavior: () => ({ y: 0 }),
        routes: RoutesManager.getConstantsRoutes()
    });

const router = createRouter();

export function resetRouter() {
    const newRouter = createRouter();
    // 重置路由
    router.matcher = newRouter.matcher;
}

export default router;
