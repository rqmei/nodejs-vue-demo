/**
 * 存储工具类
 */
export default {
    getStoreSize() {
        let sizeStore = 0;
        if (window.localStorage) {
            // 遍历所有存储
            // eslint-disable-next-line no-undef,no-restricted-syntax
            for (item in window.localStorage) {
                // eslint-disable-next-line no-prototype-builtins,no-undef
                if (window.localStorage.hasOwnProperty(item)) {
                    // eslint-disable-next-line no-undef
                    sizeStore += window.localStorage.getItem(item).length;
                }
            }
        }
        const total = (sizeStore / 1024 / 1024).toFixed(2);
        console.log(`${total}M`);
    }
};
