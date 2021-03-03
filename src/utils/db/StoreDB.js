/**
 * storeDB
 */
import store from "../../store";

export default {
    /**
     * 移除所有数据
     */
    removeAllStoreData() {
        // 移除所有使用数据
        store.dispatch("user/removeAllUserData");
    }
};
