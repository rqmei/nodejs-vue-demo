export default {
    /**
     * 手机号格式处理
     */
    formatterPhone(phone, ftm = "*") {
        if (!phone || phone.length == 0) {
            return "-";
        }
        const replaceText = ftm;
        const regArr = [3, 5, 3];
        const regText = `(\\w{${regArr[0]}})\\w{${regArr[1]}}(\\w{${regArr[2]}})`;
        const Reg = new RegExp(regText);
        const replaceCount = this.repeatStr(replaceText, regArr[1]);
        return phone.replace(Reg, `$1${replaceCount}$2`);
    },
    /**
     * 身份证号格式化处理
     */
    formatterIdentityCard(card, ftm = "*") {
        if (!card || card.length == 0) {
            return "-";
        }
        const replaceText = ftm;
        const replaceCount = this.repeatStr(replaceText, 6);
        const strCard = card.replace(/^(.{4})(?:\d+)(.{4})$/, `$1${replaceCount}$2`);
        return strCard;
    },
    /**
     * 银行卡格式化处理
     */
    formatterBankCard(card, ftm = "*") {
        if (!card || card.length == 0) {
            return "-";
        }
        const replaceText = ftm;
        const replaceCount = this.repeatStr(replaceText, 8);
        const strCard = card.replace(/^(.{4})(?:\d+)(.{4})$/, `$1${replaceCount}$2`);
        return strCard;
    },

    /**
     * 字符串循环复制,count->次数
     * @param str
     * @param count
     * @returns {string}
     */
    repeatStr(str, count) {
        let text = "";
        for (let i = 0; i < count; i++) {
            text += str;
        }
        return text;
    },
    /**
     * 处理性别
     * 性别（1：未知，2：男，3：女）
     */
    formatterGender(gender) {
        if (gender == 1) {
            return "未知";
        } else if (gender == 2) {
            return "男";
        } else if (gender == 3) {
            return "女";
        } else {
            return "-";
        }
    }
};
