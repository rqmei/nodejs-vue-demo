/**
 * 路由
 */
export default {
    /**
     * 根路由
     */
    ROOT_PATH: "/",
    /**
     *  固定路由- 默认路由-不删除-比如控制台
     */
    FIX_PATH: "/dashboard",
    /**
     * 登录
     */
    LOGIN_PATH: "/login",
    /**
     * 控制台
     */
    DASHBOARD_PATH: "/dashboard",
    /**
     * 学习劵管理
     */
    STUDY_TICKET_MANAGER: {
        //  学习劵
        STUDY_TICKET_EMPTY: "/study/ticket",
        // 模板管理
        TICKET_TEMPLATE_LIST_PATH: "/study/ticket/template/list",
        // 劵管理
        TICKET_LIST_PATH: "/study/ticket/list"
    },
    /**
     * 优惠管理
     */
    DISCOUNT_MANAGER: {
        // 优惠管理
        DISCOUNT_MANAGER_EMPTY: "/discount",
        // 优惠管理
        DISCOUNT_LIST_PATH: "/discount/list",
        // 优惠管理新增
        DISCOUNT_ADD_PATH: "/discount/add",
        // 优惠管理编辑
        DISCOUNT_EDIT_PATH: "/discount/edit",
        // 优惠管理详情
        DISCOUNT_DETAIL_PATH: "/discount/detail",
    },
    /**
     * 发票管理
     */
    INVOICE_MANAGER: {
        // 发票管理
        INVOICE_MANAGER_EMPTY: "/invoice",
        // 发票管理列表
        INVOICE_LIST_PATH: "/invoice/list",
        // 发票管理新增
        INVOICE_ADD_PATH: "/invoice/add",
        // 发票管理编辑
        INVOICE_EDIT_PATH: "/invoice/edit",
        // 发票管理详情
        INVOICE_DETAIL_PATH: "/invoice/detail",
    },
    /**
     * 订单管理
     */
    ORDER_MANAGER: {
        // 订单管理
        ORDER_MANAGER_EMPTY: "/order",
        // 订单管理列表
        ORDER_LIST_PATH: "/order/list",
        // 订单管理详情
        ORDER_DETAIL_PATH: "/order/detail",
    },
    /**
     * 购劵中心
     */
    BUY_TICKET_CENTER: {
        // 购劵中心
        BUY_TICKET_CENTER_EMPTY: "/buy/ticket",
        // 购劵中心
        BUY_TICKET_CENTER_LIST_PATH: "/buy/ticket/list",
    },
};
