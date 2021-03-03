import Vue from "vue";
import DateUtil from "../../utils/date/DateUtil";

/**
 * 日期格式化
 */
Vue.filter("dateTimeFormat", function(date, fmt = "yyyy-MM-dd HH:mm:ss") {
    return DateUtil.dateFtt(fmt, date);
});

/**
 * 时间格式 - 时分秒
 * time 时间
 * dft: 默认显示
 */
Vue.filter("timeFormat_HMS", function(time, dft = "-") {
    return DateUtil.timeFormatter_HMS(time, dft);
});
