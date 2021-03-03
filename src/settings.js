module.exports = {
    title: "替比营销系统",

    /**
     * @type {boolean} true | false
     * @description 是否在右侧显示操作设定
     */
    showSettings: true,

    /**
     * @type {boolean} true | false
     * @description 是否显示多导航栏
     */
    tagsView: true,

    /**
     * 标签栏样式
     * @type 1仅有滑动栏 2滑动栏+前后操作 3滑动栏+前后操作+设置
     * @description 是否显示多导航栏
     */
    tagsViewStyle: 1,

    /**
     * @type {boolean} true | false
     * @description 是否显示面包屑
     */
    showBreadcrumb: true,

    /**
     * @type {boolean} true | false
     * @description 是否固定顶部
     */
    fixedHeader: false,

    /**
     * @type {boolean} true | false
     * @description 是否显示LOGO
     */
    sidebarLogo: true,

    /**
     * @type {string | array} 'production' | ['production', 'development']
     * @description 是否显示错误日志, 可使用数组排列多个
     */
    errorLog: "production",

    /**
     * @type {boolean} true | false
     * @descriptiontrue 加密, false 不加密
     */
    localStoreEncrypt: false
};
