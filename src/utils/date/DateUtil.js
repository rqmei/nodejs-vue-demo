/**
 * 日期处理
 */
export default {
    format: {
        YYYY_MM_DD_HH_MM_SS: "yyyyMMddhhmmss",
        YYYY_MM_DD: "yyyyMMdd",
        HH_MM_SS: "hhmmss"
    },
    /**
     * Parse the time to string
     * @param {(Object|string|number)} time
     * @param {string} cFormat
     * @returns {string | null}
     */
    parseTime(time, cFormat) {
        if (arguments.length === 0) {
            return null;
        }
        const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
        let date;
        if (typeof time === "object") {
            date = time;
        } else {
            if (typeof time === "string") {
                if (/^[0-9]+$/.test(time)) {
                    // eslint-disable-next-line no-param-reassign,radix
                    time = parseInt(time);
                } else {
                    // 支持safari
                    // eslint-disable-next-line no-param-reassign
                    time = time.replace(new RegExp(/-/gm), "/");
                }
            }

            if (typeof time === "number" && time.toString().length === 10) {
                // eslint-disable-next-line no-param-reassign
                time *= 1000;
            }
            date = new Date(time);
        }
        const formatObj = {
            y: date.getFullYear(),
            m: date.getMonth() + 1,
            d: date.getDate(),
            h: date.getHours(),
            i: date.getMinutes(),
            s: date.getSeconds(),
            a: date.getDay()
        };
        // eslint-disable-next-line camelcase
        const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
            const value = formatObj[key];
            // Note: getDay() 星期天为0
            if (key === "a") {
                return ["日", "一", "二", "三", "四", "五", "六"][value];
            }
            return value.toString().padStart(2, "0");
        });
        // eslint-disable-next-line camelcase
        return time_str;
    },

    /**
     * @param {number} time
     * @param {string} option
     * @returns {string}
     */
    formatTime(time, option) {
        if (`${time}`.length === 10) {
            // eslint-disable-next-line radix,no-param-reassign
            time = parseInt(time) * 1000;
        } else {
            // eslint-disable-next-line no-param-reassign
            time = +time;
        }
        const d = new Date(time);
        const now = Date.now();

        const diff = (now - d) / 1000;

        if (diff < 30) {
            return "刚刚";
        }
        if (diff < 3600) {
            // 小于1小时
            return `${Math.ceil(diff / 60)}分钟前`;
        }
        if (diff < 3600 * 24) {
            return `${Math.ceil(diff / 3600)}小时前`;
        }
        if (diff < 3600 * 24 * 2) {
            return "1天前";
        }
        if (option) {
            return this.parseTime(time, option);
        }
        return `${d.getMonth() + 1}月${d.getDate()}日${d.getHours()}时${d.getMinutes()}分`;
    },

    /**
     * @param {string} type
     * @returns {Date}
     */
    getTime(type) {
        if (type === "start") {
            return new Date().getTime() - 3600 * 1000 * 24 * 90;
        }
        return new Date(new Date().toDateString());
    },
    dateFtt: (sourceFmt, sourceDate) => {
        let fmt = sourceFmt;
        let date = sourceDate;
        if (sourceDate == null || sourceDate === undefined) {
            date = new Date();
        }
        const o = {
            "M+": date.getMonth() + 1, // 月份
            "d+": date.getDate(), // 日
            "h+": date.getHours(), // 小时
            "m+": date.getMinutes(), // 分
            "s+": date.getSeconds(), // 秒
            "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
            S: date.getMilliseconds() // 毫秒
        };

        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, `${date.getFullYear()}`.substr(4 - RegExp.$1.length));
        }
        for (const k in o)
            if (new RegExp(`(${k})`).test(fmt))
                fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length));
        return fmt;
    },
    /**
     * 获取当前月的第一天和最后一天
     */
    setCurreDate: () => {
        const now = new Date(); // 当前日期
        const nowMonth = now.getMonth(); // 当前月
        const nowYear = now.getFullYear(); // 当前年
        // 本月的开始时间
        const monthStartDate = new Date(nowYear, nowMonth, 1, 0, 0, 0);
        // 本月的结束时间
        const monthEndDate = new Date(nowYear, nowMonth + 1, 0, 23, 59, 59);
        return [monthStartDate, monthEndDate];
    },
    /**
     * 获取时分秒
     */
    timeFormatter_HMS(time, dft = "-") {
        const total = parseInt(time);
        if (!isNaN(total)) {
            const hours = parseInt(total / 3600);
            const minutes = parseInt((total % 3600) / 60);
            const seconds = parseInt((total % 3600) % 60);
            const h = hours == 0 ? "" : `${hours}时`;
            const m = minutes == 0 ? "" : `${minutes}分`;
            const s = seconds == 0 ? "" : `${seconds}秒`;
            return h + m + s;
        } else {
            return dft;
        }
    },
    /**
     * 获取距离指定时间还有多少天
     * @param {String | Number | Date} dateTime 日期时间
     * @example
     * ```javascript
     *     getDistanceSpecifiedTime('2019/02/02 02:02:00');
     *     getDistanceSpecifiedTime(1549036800000);
     *     getDistanceSpecifiedTime(new Date("2019/2/2 00:00:00"));
     * ```
     */
    getDistanceSpecifiedTime(dateTime) {
        let html = "";
        if (dateTime) {
            // 指定日期和时间
            const EndTime = new Date(dateTime);
            // 当前系统时间
            const NowTime = new Date();
            if (t > 0) {
                const t = EndTime.getTime() - NowTime.getTime();
                const d = Math.floor(t / 1000 / 60 / 60 / 24);
                const h = Math.floor((t / 1000 / 60 / 60) % 24);
                const m = Math.floor((t / 1000 / 60) % 60);
                const s = Math.floor((t / 1000) % 60);
                console.log(t);
                if (d > 0) {
                    html = `${d} 天`;
                }
                if (h > 0) {
                    html = `${html + h} 时`;
                }
                if (m > 0) {
                    html = `${html + m} 分`;
                }
                if (s > 0) {
                    html = `${html + s} 秒`;
                }
            }
        }
        return html;
    }
};
