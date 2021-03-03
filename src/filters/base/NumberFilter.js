import Vue from "vue";
import NumberUtil from "../../utils/supplement/NumberUtil";

/**
 * 保留小数位，acc为保留几位小数位 默认2位
 */
Vue.filter("toFixed", function(val, acc) {
    return NumberUtil.toFixed(val, acc);
});

/**
 * 小数转百分比 ，acc为保留小数位
 */
Vue.filter("toPercent", function(val, acc) {
    return NumberUtil.toPercent(val, acc);
});

/**
 * 将分转换为 K 或者 W 为单位
 */
Vue.filter("NumToUnitNum", function(value) {
    if (!value) return "0";
    if (value >= 100000) {
        return `${parseFloat(NumberUtil.toFixed(Number(value / 100000), 2))}K`;
    } else {
        return parseFloat(NumberUtil.toFixed(Number(value / 100), 2));
    }
});
