/**
 * 数值处理
 */
export default {
    /**
     *  分 --> 元
     */
    regFenToYuan(fen) {
        let num = fen;
        num = fen * 0.01;
        num += "";
        const reg = num.indexOf(".") > -1 ? /(\d{1,3})(?=(?:\d{3})+\.)/g : /(\d{1,3})(?=(?:\d{3})+$)/g;
        num = num.replace(reg, "$1");
        num = this.toDecimal2(num);
        return num;
    },
    /**
     * 强制保留两位小数
     * @param x
     * @returns {string|boolean}
     */
    toDecimal2(x) {
        const flo = parseFloat(x);
        if (isNaN(flo)) {
            return false;
        }
        const f = Math.round(x * 100) / 100;
        const s = f.toString();
        return s;
    },
    /**
     *  保留几位小数 默认2位 2位小数
     * val 不用传值 默认是过滤值
     * acc 小数点位数
     */
    toFixed(val, acc) {
        let num = parseFloat(val);
        if (isNaN(num)) {
            num = 0;
        }
        let accuracy = parseInt(acc);
        if (isNaN(accuracy) || accuracy < 0 || accuracy > 10) {
            accuracy = 2;
        }
        return num.toFixed(accuracy);
    },
    /**
     * 小数转百分比 ，acc为保留小数位
     */
    toPercent(val, acc) {
        let num = parseFloat(val);
        if (isNaN(num)) {
            num = 0;
        }
        let accuracy = parseInt(acc);
        if (isNaN(accuracy) || accuracy < 0 || accuracy > 10) {
            accuracy = 2;
        }
        return `${(num * 100).toFixed(accuracy)}%`;
    }
};
