import MessageUtil from "./MessageUtil.js";

export default {
    /**
     * successMsg或errMsg以*号开头，那么优先提示，否则优先提示后台来的信息；
     * 以+开头，则将信息加到前面
     * 以+号结尾，则将信息加到后面
     * @param result
     * @param successMsg
     * @param errMsg
     * @param succssFunc
     * @param errFunc
     */
    do(result, successMsg, errMsg, succssFunc, errFunc) {
        if (result && result.code === 0) {
            if (successMsg) {
                const message = this.getMessage(result, successMsg);
                MessageUtil.success(message);
            }

            if (succssFunc) {
                succssFunc();
            }
        } else {
            const message = this.getMessage(result, errMsg);
            MessageUtil.error(message);

            if (errFunc) {
                errFunc();
            }
        }
    },

    /**
     * 处理消息， 处理一些特殊格式的消息， 以适应提示需要
     * @param result
     * @param customMessage
     * @returns {*}
     */
    getMessage(result, customMessage) {
        let sMessage = result.description;
        if (customMessage && customMessage.startsWith("*")) {
            sMessage = customMessage.substring(1);
        }

        return sMessage;
    }
};
