import Validate from "./Validate.js";

/**
 * 验证手机号正确且不能为null
 */
export const validatePhoneNotNull = function(rule, value, callback) {
    if (value === "") {
        return callback(new Error("电话号码是必填项"));
    } else if (value.toString().length !== 11) {
        return callback(new Error("电话号码必须是11位数字"));
    } else if (!Validate.validPhone(value)) {
        return callback(new Error("请输入正确的电话号码"));
    } else {
        callback();
    }
};
/**
 * 验证手机号且可以为null
 */
export const validatePhoneOptionNull = function(rule, value, callback) {
    if (value === "" || value == null) {
        return callback();
    } else if (value.toString().length !== 11) {
        return callback(new Error("电话号码必须是11位数字"));
    } else if (!Validate.validPhone(value)) {
        return callback(new Error("请输入正确的电话号码"));
    } else {
        return callback();
    }
};

/**
 * 验证邮箱 且可以为null
 */
export const validateEmailOptionNull = function(rule, value, callback) {
    if (value === "" || value === undefined || value == null) {
        return callback();
    } else if (value.length > 30) {
        return callback(new Error("限制不能超过30个字符串"));
    } else if (!Validate.validEmail(value)) {
        return callback(new Error("请正确输入邮箱格式"));
    } else {
        callback();
    }
};
/*
 *  特殊符号验证
 * */
export const validateCheckSpecificKey = function(rule, value, callback) {
    if (value == null || value === "") {
        return callback();
    }
    if (Validate.isContainerSpecifyKey(value)) {
        return callback(new Error("请勿输入特殊字符"));
    } else {
        return callback();
    }
};
export const validateURL = function(rule, value, callback) {
    if (value == null || value === "") {
        return callback();
    }
    if (!Validate.validURL(value)) {
        return callback(new Error("请输入正确的地址"));
    } else {
        return callback();
    }
};
/**
 * 特殊符号验证 - 必须
 */
export const validateInputSpecificKeyRequireNoNull = function(rule, value, callback) {
    if (value == null || value.length === 0) {
        return callback(new Error("输入内容不能为空"));
    }
    if (Validate.isContainerSpecifyKey(value)) {
        return callback(new Error("请勿输入特殊字符"));
    } else {
        callback();
    }
};
/**
 * 验证输入框是否达到30个字符 -数字/字符/下划线 可以为null
 */
export const validateCharOptionNull = function(rule, value, callback) {
    if (value === "" || value == null) {
        return callback();
    } else if (value.length > 30) {
        return callback(new Error("限制不能超过30个字符串"));
    } else if (!Validate.validUsername(value)) {
        return callback(new Error("只能输入字母、数字、下划线"));
    } else {
        return callback();
    }
};

/**
 * 特殊符号验证 - 不能null
 */
export const validateSpecificKeyNotNull = function(rule, value, callback) {
    if (value == null || value.length === 0) {
        return callback(new Error("输入内容不能为空"));
    }
    if (Validate.isContainerSpecifyKey(value)) {
        return callback(new Error("请勿输入特殊字符"));
    } else {
        callback();
    }
};

/**
 * 特殊符号验证 - 可以null
 */
export const validateSpecificKeyOptionNull = function(rule, value, callback) {
    if (value == null || value === "") {
        return callback();
    }
    if (Validate.isContainerSpecifyKey(value)) {
        return callback(new Error("请勿输入特殊字符"));
    } else {
        return callback();
    }
};
/**
 * 验证数字 - 不能为null
 */
export const validateNumberNotNull = function(rule, value, callback) {
    if (value === null || value === "") {
        return callback("必须输入对应得值");
    } else if (!Validate.isNumber(value)) {
        return callback(new Error("输入必须是数字"));
    } else {
        return callback();
    }
};
