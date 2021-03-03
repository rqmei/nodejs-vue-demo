/**
 * 共有的formatter
 */
import GlobalHelper from "../tool/GlobalHelper.js";
import NumberUtil from "../supplement/NumberUtil.js";

export default {
    /**
     * 判断图片
     */
    formatterImageURL(imgUrl) {
        return this.formatterLoadingImage(imgUrl, require("../../assets/image_default.png"));
    },
    /**
     * 判断图片是否为null并展示默认图片
     */
    formatterLoadingImage(imgUrl, defaultImagePath) {
        if (imgUrl == null || imgUrl === undefined || imgUrl.length === 0) {
            return defaultImagePath;
        } else {
            return GlobalHelper.filterLoadingURL(imgUrl);
        }
    },
    /**
     * 判断是否是对象
     */
    isObject(obj) {
        const result = Object.prototype.toString.call(obj) === "[object Object]";
        return result;
    },
    /**
     * 金额有小数点的处理 分-->元
     */
    formatterMoneyPointStr(money) {
        if (money === null || money === undefined || money <= 0) {
            return "0.00";
        }
        const result = NumberUtil.regFenToYuan(money);
        return result <= 0 ? "0.00" : String(result);
    },
    /**
     *  显示默认字符
     */
    formatterNoDefaultStr() {
        return "-";
    }
};
