import context from "../../main";
import store from "../../store";
import router from "../../router";

export default {
    getCurrentPath(path) {
        return path || context.$router.currentRoute.path;
    },

    close(path) {
        const routePath = this.getCurrentPath(path);
        context.$store.dispatch("tagsView/delView", {
            path: routePath
        });

        return routePath;
    },

    pushSimple(pushPath, data) {
        context.$router.push({
            path: pushPath,
            query: data
        });
    },

    /**
     * 关闭当前路由并打开另一个路由
     * @param data 打开另一个数据的查询数据, 使用的是query形式,需要使用param, 请自行封装
     * @param pushPath 推送的path
     * @param closePath 需要的关闭的path
     */
    closePush(data, pushPath, closePath) {
        let pushTo = pushPath;

        if (!pushTo) {
            const currentPath = this.getCurrentPath(closePath);
            const view = this.get(currentPath);
            if (view && view.meta && view.meta.pushPath) {
                pushTo = view.meta.pushPath;
            }
        }

        this.close(closePath);
        this.pushSimple(pushTo, data);
    },

    /**
     * 通过path获取某个路由信息
     * @param path
     * @returns {null}
     */
    get(path) {
        const routePath = path || context.$router.currentRoute.path;
        let view = null;

        const { visitedViews } = context.$store.getters;
        // eslint-disable-next-line no-restricted-syntax
        for (const v of visitedViews) {
            if (v.path === routePath) {
                view = v;
                break;
            }
        }
        return view;
    },

    /**
     * 获取能用的第一个路由, 父路由不算
     */
    getFirstRouteWithUse(routes) {
        if (routes && routes.length > 0) {
            const route = routes[0];
            if (route.children) {
                return this.getFirstRouteWithUse(route.children);
            }
            return route.path;
        } else {
            console.log("没有找到任何路由");
            return "";
        }
    },

    /**
     * 根据权限添加路由
     */
    async addPermissionRoutes() {
        // const { roleList } = await store.dispatch("user/getInfo");
        // lzb 不用获取登录的角色, 默认角色
        const roleList = await store.getters.roles;
        const accessRoutes = await store.dispatch("permission/generateRoutes", roleList);
        await router.addRoutes(accessRoutes);
    },

    /**
     * 路由是否已加载
     */
    routeIsLoaded(path) {
        // 检测有路由是否加入, 没有则加入;
        let existsPath = path;
        if (!existsPath) {
            // lzb 2020-06-17 当 permissionAddRoutes 是null 的时候可能会死循环 所以取值permission_routes
            const { permissionAddRoutes } = store.getters;
            if (permissionAddRoutes && permissionAddRoutes.length > 0) {
                existsPath = this.getFirstRouteWithUse(permissionAddRoutes);
            } else {
                const routes = store.getters.permission_routes;
                existsPath = this.getFirstRouteWithUse(routes);
            }
        }

        if (existsPath && existsPath.length > 0) {
            const match = router.match({
                path: existsPath
            });

            // console.log("当前路由:{}, 是否已加载: {}", existsPath, match && match.matched.length > 0);

            if (match && match.matched.length > 0) {
                return true;
            }
        }
        return false;
    },

    /**
     * 加载路由
     * @returns {Promise<void>}
     */
    async reloadRoutes() {
        // 检测有路由是否加入, 没有则加入;
        const loaded = this.routeIsLoaded();

        // console.log("reloadRoutes加载路由：", loaded);
        if (!loaded) {
            await this.addPermissionRoutes();
        }
    }
};
