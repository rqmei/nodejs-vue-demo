// 进度条

// token管理器, 管理于cookie中
import MessageUtil from "./utils/hud/MessageUtil.js";
import PageUtil from "./utils/supplement/PageUtil.js";
import TokenUtil from "./utils/db/TokenUtil.js";
import RouteUtil from "./utils/route/RouteUtil.js";
import router from "./router";
import store from "./store";
import ProgressUtil from "./utils/hud/ProgressUtil";
import RoutePathConstants from "./utils/constants/RoutePathConstants";
import HudGlobal from "./utils/hud/HudGlobal";
import UserUtil from "./utils/user/UserUtil";
import MessageConstants from "./utils/constants/MessageConstants";

// 进度条配置
ProgressUtil.initProgress();

// 跳转路由白名单
const whiteList = [RoutePathConstants.LOGIN_PATH];

// 不验证token的白名单
const whiteNoTokenList = [];

router.beforeEach(async (to, from, next) => {
    // 开始进度条
    ProgressUtil.stopProgress();

    // 设置页面标题
    document.title = PageUtil.getPageTitle(to.meta.title);

    // 1. 不用校验token的白名单
    if (whiteNoTokenList.indexOf(to.path) !== -1) {
        next();
        ProgressUtil.stopProgress();
        return;
    }

    // 2.检测是否有token 检测是否登录, 存储于cookie中
    const tokenExpired = TokenUtil.getTokenExpiredResult();

    // 2.1 没有token
    if (tokenExpired === -1) {
        if (whiteList.indexOf(to.path) !== -1) {
            // 白名单路由直接跳转
            next();
        } else {
            // 其它路由, 使用login跳转
            next(`/login?redirect=${to.path}`);
        }
        ProgressUtil.stopProgress();
        return;
    }

    // 2.2 token 已过期
    if (tokenExpired === 2) {
        HudGlobal.showAlertConfirmMessage(MessageConstants.PAGE_EXPIRED_MESSAGE).then(res => {
            UserUtil.logout().then(res => {});
        });
        ProgressUtil.stopProgress();
        return;
    }

    // 2.3 有token - 检测是否是登录跳转
    if (to.path === RoutePathConstants.LOGIN_PATH) {
        // 如果登录跳转首页
        next({ path: "/" });
        ProgressUtil.stopProgress();
        return;
    }

    // 检测是否拥有角色, 至少一个
    const hasRoles = store.getters.roles && store.getters.roles.length > 0;
    // 判断当前路由是否在路由中
    const isLoaded = RouteUtil.routeIsLoaded();

    const result = hasRoles && isLoaded;
    if (result) {
        next();
    } else {
        try {
            // 加载路径
            await RouteUtil.reloadRoutes();

            // to传入, 确保路由已被加载, replace本次跳转不留下历史记录
            next({ ...to, replace: true });
        } catch (error) {
            // 移除登录
            await store.dispatch("user/resetToken");
            MessageUtil.error(error.message || "Has Error");
            next(`/login?redirect=${to.path}`);
            ProgressUtil.stopProgress();
        }
    }
});

router.afterEach(() => {
    // 结束进度条
    ProgressUtil.stopProgress();
});
