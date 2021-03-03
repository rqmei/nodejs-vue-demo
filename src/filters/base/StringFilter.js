import Vue from "vue";
import StringUtil from "../../utils/supplement/StringUtil";

/**
 * 手机号格式化 - 185****3265
 */
Vue.filter("phoneFormatter", function(val, ftm = "*") {
    return StringUtil.formatterPhone(val, ftm);
});

/**
 * 身份证号格式化1222*********5121
 */
Vue.filter("identityCardFormatter", function(val, ftm = "*") {
    return StringUtil.formatterIdentityCard(val, ftm);
});

/**
 * 银行卡号格式化1222*********5121
 */
Vue.filter("bankCardFormatter", function(val, ftm = "*") {
    return StringUtil.formatterBankCard(val, ftm);
});
/**
 * 性别格式化
 */
Vue.filter("genderFormatter", function(val) {
    return StringUtil.formatterGender(val);
});
