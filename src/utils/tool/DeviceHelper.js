import Bowser from "bowser";

export default {
    /**
     * @return {number}
     */
    IEVersion() {
        const userAgent = navigator.userAgent; // 取得浏览器的userAgent字符串
        const isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; // 判断是否IE<11浏览器
        const isEdge = userAgent.indexOf("Edge") > -1 && !isIE; // 判断是否IE的Edge浏览器
        const isIE11 = userAgent.indexOf("Trident") > -1 && userAgent.indexOf("rv:11.0") > -1;
        if (isIE) {
            const reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            const fIEVersion = parseFloat(RegExp.$1);
            if (fIEVersion === 7) {
                return 7;
            } else if (fIEVersion === 8) {
                return 8;
            } else if (fIEVersion === 9) {
                return 9;
            } else if (fIEVersion === 10) {
                return 10;
            } else {
                // IE版本<=7
                return 6;
            }
        } else if (isEdge) {
            return "edge"; // edge
        } else if (isIE11) {
            return 11; // IE11
        } else {
            return -1; // 不是ie浏览器
        }
    },
    /**
     * 获取浏览器信息
     */
    getBrowserInfo(param) {
        const browser = Bowser.getParser(window.navigator.userAgent);
        const result = browser.getResult();
        const browserInfo = {};
        browserInfo.browserName = result.browser.name;
        browserInfo.browserVersion = result.browser.version;
        browserInfo.browserEngine = result.engine.name;
        browserInfo.platform = result.platform.type;
        browserInfo.osName = result.os.name;
        browserInfo.osVersion = result.os.versionName;
        browserInfo.osDpi = `${window.screen.width}x${window.screen.height}`;
        param = Object.assign(param, browserInfo);
        return param;
    },
    /**
     * 获取浏览器类型
     */
    getBrowserType() {
        const { userAgent } = window.navigator; // 取得浏览器的userAgent字符串
        console.log("浏览器信息----", userAgent);
        // 判断是否Opera浏览器
        const isOpera = userAgent.indexOf("Opera") > -1;
        if (isOpera) {
            return "Opera";
        }
        // 判断是否Firefox浏览器
        if (userAgent.indexOf("Firefox") > -1) {
            return "FF";
        }
        // 判断是否Chrome浏览器
        if (userAgent.indexOf("Chrome") > -1) {
            return "Chrome";
        }
        // 判断是否Safari浏览器
        if (userAgent.indexOf("Safari") > -1) {
            return "Safari";
        }
        // 判断是否IE浏览器
        if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
            return "IE";
        }
    }
};
