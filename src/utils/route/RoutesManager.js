import Layout from "@/layout";
import RoutePathConstants from "../constants/RoutePathConstants";
import router from "../../router";
import UserDataManager from "../user/UserDataManager";
import EnumConstants from "../constants/EnumConstants";
/**
 * 常量路由 配置
 */
export default {
    /**
     * 获取常量路由
     */
    getConstantsRoutes() {
        const constantsRoutes = [
            {
                path: "/redirect",
                component: Layout,
                hidden: true,
                children: [
                    {
                        path: "/redirect/:path*",
                        component: () => import("@/views/redirect/index")
                    }
                ]
            },
            {
                path: "/login",
               /* component: () => import("@/views/login/Login.vue"),*/
                component: () => import("@/views/error-page/404"),
                hidden: true
            },

            {
                path: "/404",
                component: () => import("@/views/error-page/404"),
                hidden: true
            },

            {
                path: "/401",
                component: () => import("@/views/error-page/401"),
                hidden: true
            }
        ];
        return constantsRoutes;
    },

    /**
     * 获取异步动态路由
     */
    getAsyncRoutes() {
        const allRouter = process.env.VUE_APP_OPEN_ALL_ROUTER;
        if (allRouter && allRouter === "true") {
            const adminRouters = this.getAllRoutes();
            return adminRouters;
        }
        // 如果是总部 返回总部菜单
        if (UserDataManager.getCurrentTypeCode() == EnumConstants.organizationType.ORGTYPE_HEAD_OFFICE) {
            return this.getAdminRoutes();
        }

        // 如果是企业/代理商 返回企业菜单
        if (UserDataManager.getCurrentTypeCode() == EnumConstants.organizationType.ORGTYPE_COMPANY) {
            return this.getCompanyRoutes();
        }
    },

    /**
     * 获取总部路由
     */
    getAdminRoutes() {
        return [
            // eslint-disable-next-line no-underscore-dangle
            this.__getMenuDashBord(),
            // eslint-disable-next-line no-underscore-dangle
            this.__getMenuStudyTicket(), // 学习劵管理
            // eslint-disable-next-line no-underscore-dangle
            this.__getMenuDiscount() // 优惠管理
        ];
    },
    /**
     * 获取企业路由
     */
    getCompanyRoutes() {
        return [];
    },
    /**
     * 获取所有路由
     */
    getAllRoutes() {
        return [
            // eslint-disable-next-line no-underscore-dangle
            this.__getMenuDashBord(),
            // eslint-disable-next-line no-underscore-dangle
            this.__getMenuStudyTicket(), // 学习劵管理
            // eslint-disable-next-line no-underscore-dangle
            this.__getMenuDiscount(), // 优惠管理
            // eslint-disable-next-line no-underscore-dangle
            this.__getMenuInvoice(), // 发票管理
            // eslint-disable-next-line no-underscore-dangle
            this.__getMenuOrder(), // 订单管理
            // eslint-disable-next-line no-underscore-dangle
            this.__getMenuBuyTicketCenter(), // 购劵中心
        ];
    },

    // ===========================================================内部菜单选项======================================= //
    /**
     * 获取控制台菜单
     */
    // eslint-disable-next-line no-underscore-dangle
    __getMenuDashBord() {
        return {
            path: "/",
            component: Layout,
            redirect: RoutePathConstants.DASHBOARD_PATH,
            children: [
                {
                    path: RoutePathConstants.DASHBOARD_PATH,
                    name: "Home",
                    // component: () => import("@/views/dashboard/Dashboard.vue"),
                    meta: { title: "控制台", icon: "dashboard", affix: true }
                }
            ]
        };
    },
    /**
     * 获取学习劵菜单
     */
    // eslint-disable-next-line no-underscore-dangle
    __getMenuStudyTicket() {
        return {
            path: RoutePathConstants.STUDY_TICKET_MANAGER.STUDY_TICKET_EMPTY,
            component: Layout,
            redirect: RoutePathConstants.STUDY_TICKET_MANAGER.TICKET_TEMPLATE_LIST_PATH,
            name: "TemplateList",
            meta: { title: "学习劵管理", icon: "dashboard" },
            children: [
                {
                    path: RoutePathConstants.STUDY_TICKET_MANAGER.TICKET_TEMPLATE_LIST_PATH,
                    name: "TemplateList",
                    //    component: () => import("@/views/study-ticket-manager/template-manager/TemplateList.vue"),
                    meta: { title: "模板管理", icon: "dashboard" }
                },
                {
                    path: RoutePathConstants.STUDY_TICKET_MANAGER.TICKET_LIST_PATH,
                    name: "TicketList",
                    //   component: () => import("@/views/study-ticket-manager/ticket-manager/TicketList.vue"),
                    meta: { title: "劵管理", icon: "dashboard" }
                }
            ]
        };
    },
    /**
     * 获取优惠管理菜单
     */
    // eslint-disable-next-line no-underscore-dangle
    __getMenuDiscount() {
        return {
            path: RoutePathConstants.DISCOUNT_MANAGER.DISCOUNT_MANAGER_EMPTY,
            component: Layout,
            redirect: RoutePathConstants.DISCOUNT_MANAGER.DISCOUNT_LIST_PATH,
            name: "DiscountManger",
            meta: { title: "优惠管理", icon: "dashboard" },
            children: [
                {
                    path: RoutePathConstants.DISCOUNT_MANAGER.DISCOUNT_LIST_PATH,
                    name: "DiscountList",
                    //   component: () => import("@/views/discount-manager/DiscountList.vue"),
                    meta: { title: "优惠管理", icon: "dashboard" }
                }
            ]
        };
    },
    /**
     * 获取发票管理菜单
     */
    // eslint-disable-next-line no-underscore-dangle
    __getMenuInvoice() {
        return {
            path: RoutePathConstants.INVOICE_MANAGER.INVOICE_MANAGER_EMPTY,
            component: Layout,
            redirect: RoutePathConstants.INVOICE_MANAGER.INVOICE_LIST_PATH,
            name: "InvoiceManager",
            meta: { title: "发票管理", icon: "dashboard" },
            children: [
                {
                    path: RoutePathConstants.INVOICE_MANAGER.INVOICE_LIST_PATH,
                    name: "InvoiceList",
                    //    component: () => import("@/views/invoice-manager/InvoiceList.vue"),
                    meta: { title: "发票管理", icon: "dashboard" }
                }
            ]
        };
    },
    /**
     * 获取订单管理菜单
     */
    // eslint-disable-next-line no-underscore-dangle
    __getMenuOrder() {
        return {
            path: RoutePathConstants.ORDER_MANAGER.ORDER_MANAGER_EMPTY,
            component: Layout,
            redirect: RoutePathConstants.ORDER_MANAGER.ORDER_LIST_PATH,
            name: "OrderManager",
            meta: { title: "订单管理", icon: "dashboard" },
            children: [
                {
                    path: RoutePathConstants.ORDER_MANAGER.ORDER_LIST_PATH,
                    name: "OrderList",
                    //    component: () => import("@/views/order-manager/OrderList.vue"),
                    meta: { title: "订单管理", icon: "dashboard" }
                }
            ]
        };
    },

    /**
     * 获取购劵菜单
     */
    // eslint-disable-next-line no-underscore-dangle
    __getMenuBuyTicketCenter() {
        return {
            path: RoutePathConstants.BUY_TICKET_CENTER.BUY_TICKET_CENTER_EMPTY,
            component: Layout,
            redirect: RoutePathConstants.BUY_TICKET_CENTER.BUY_TICKET_CENTER_LIST_PATH,
            name: "BuyTicketCenter",
            meta: { title: "购劵中心", icon: "dashboard" },
            children: [
                {
                    path: RoutePathConstants.BUY_TICKET_CENTER.BUY_TICKET_CENTER_LIST_PATH,
                    name: "BuyTicketList",
                    //   component: () => import("@/views/buy-ticket-center/BuyTicketList.vue"),
                    meta: { title: "购劵中心", icon: "dashboard" }
                }
            ]
        };
    },
};
