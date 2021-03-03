import HudGlobal from "../hud/HudGlobal.js";
import DeviceHelper from "./DeviceHelper.js";

export default {
    /**
     * 点击下载方法
     */
    downWithUrl(url) {
        if (url == null || url.length == 0) {
            return;
        }
        window.open(url, "_blank").location;
    },
    /**
     * 打开新的网页
     */
    openWithUrl(url) {
        if (url == null || url.length == 0) {
            return;
        }
        if (DeviceHelper.getBrowserType() == "Safari") {
            const message = "您新打开的窗口可能被阻止，请允许安全性验证偏好设置-->安全性-->允许";
            HudGlobal.showAlertConfirmMessage(message).then(res => {
                const newPage = window.open("newPage", "_blank");
                newPage.location = url;
            });
        } else {
            const message = "您确定需要打开一个新的窗口吗？";
            HudGlobal.showAlertConfirmMessage(message).then(res => {
                window.open(url, "_blank").location;
            });
        }
    },

    /**
     * 关闭窗口
     */
    closeWindowEvent() {
        const { userAgent } = navigator;

        if (userAgent.indexOf("Firefox") != -1 || userAgent.indexOf("Chrome") != -1) {
            window.opener = null;
            window.open("", "_self", "");
            // window.open(" ", "_self").location;
            window.location.href = "about:blank";
            window.close();
        } else {
            window.opener = null;
            window.open("", "_self", "");
            // window.open(" ", "_self").location;
            window.location.href = "about:blank";
            window.close();
        }
    },
    /**
     * 图片url处理
     */
    filterLoadingURL(url) {
        console.log(url);
        const splitStr = "://";
        let resultUrl = url;
        if (url && url.length > 0) {
            const urlArray = url.split("://");
            if (urlArray && urlArray.length > 1) {
                const scheme = urlArray[0];
                let path = urlArray[1];
                path = path.replace(/\/\//g, "/");
                resultUrl = scheme + splitStr + path;
            }
        }
        return resultUrl;
    }
};
