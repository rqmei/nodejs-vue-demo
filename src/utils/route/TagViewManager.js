import storex from "../../store";
import router from "../../router.js";
import RoutePathConstants from "../constants/RoutePathConstants.js";
/**
 * 标签管理
 */
export default {
    /**
     * 移除单个标签
     */
    removeTab(url) {
        const tagVisitedViews = storex.state.tagsView.visitedViews;
        if (!tagVisitedViews) {
            return;
        }
        // 1. 找出url 对应的view
        let view;
        for (let i = 0; i < tagVisitedViews.length; i++) {
            if (tagVisitedViews[i].path === url) {
                view = tagVisitedViews[i];
            }
        }
        if (!view) {
            return;
        }

        // 移除tag
        storex.dispatch("tagsView/delView", view).then(({ visitedViews }) => {
            if (this.isActive(view)) {
                this.toLastView(visitedViews, view);
            }
        });
    },
    /**
     * 是否是当前活跃路由
     * @param route
     * @returns {boolean}
     */
    isActive(route) {
        return route.path === router.app.$route.path;
    },
    /**
     * 选择最后一个路由
     */
    toLastView(visitedViews, view) {
        if (!visitedViews) {
            return;
        }
        const latestView = visitedViews.slice(-1)[0];
        if (latestView) {
            router.push(latestView.fullPath);
            return false;
        }

        // 如果标签没有名称，默认跳转到首页
        if (view.name === RoutePathConstants.FIX_PATH) {
            // 重新加载
            router.replace({ path: `/redirect${view.fullPath}` });
        } else {
            router.push(RoutePathConstants.ROOT_PATH);
        }
    }
};
