/**
 * 通用常量
 */
export default {
    /**
     * 默认系统内部角色
     */
    defaultSystemRole: "system_role_admin",
    /**
     * page 常量
     */
    page: {
        currentPage: 1,

        pageSize: 4,

        pageSizes: [2, 3, 4, 5, 10, 20, 30, 50],

        layoutDefault: "total, sizes, prev, pager, next, jumper",
        pageSizeDefault: 10
    },
    /**
     * 文件允许类型
     */
    fileAllowedImageTypes: ["image/jpeg", "application/x-jpg", "image/png", "image/gif", "application/x-bmp"],

    /**
     * 全局的storagekeys
     */
    globalLocalStorageKeys: {
        // 全局状态的key
        GLOBAL_STATE_DATA_KEY: "tibi-pc-data"
    }
};
