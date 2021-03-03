import RoutePathConstants from "../../../utils/constants/RoutePathConstants";
import ObjectUtil from "../../../utils/supplement/ObjectUtil";
import pathToRegexp from "path-to-regexp";

export default {
    data() {
        return {
            levelList: null
        };
    },
    watch: {
        $route(route) {
            // 不要将redirect页面加入到面包屑
            if (route.path.startsWith("/redirect/")) {
                return;
            }
            this.getBreadcrumb();
        }
    },
    created() {
        this.getBreadcrumb();
    },
    methods: {
        getBreadcrumb() {
            // 显示路由名称, 使用的是相似路由级联，TODO 增加在同级路由下点击时，路由有面包屑
            let matched = this.$route.matched.filter(item => item.meta && item.meta.title);
            const first = matched[0];

            if (!this.isFixedPathRoute(first)) {
                const fixRoute = {
                    path: RoutePathConstants.FIX_PATH,
                    meta: { title: "首页" }
                };
                const routes = [];
                routes.push(fixRoute);
                matched = routes.concat(matched);
            }

            this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false);
        },
        isFixedPathRoute(route) {
            const name = route && route.name;
            if (!name) {
                return false;
            }
            return name.trim().toLocaleLowerCase() === "home".toLocaleLowerCase();
        },
        pathCompile(path) {
            const { params } = this.$route;
            // lzb-05-21 修改 -只有有参数的时候才做参数拼接
            if (!ObjectUtil.isEmptyObject(params)) {
                const toPath = pathToRegexp.compile(path)(params);
                return toPath;
            } else {
                return path;
            }
            // const toPath = pathToRegexp.compile(path);
            // return toPath(params);
        },
        handleLink(item) {
            const { redirect, path } = item;
            if (redirect) {
                this.$router.push(redirect);
                return;
            }
            this.$router.push(this.pathCompile(path));
        }
    }
};
