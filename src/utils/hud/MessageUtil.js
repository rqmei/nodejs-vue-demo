import { Loading, Message, MessageBox, Notification } from "element-ui";

export default {
    alert(message, title) {
        if (message) {
            MessageBox.alert(message, title || "提示", {});
        }
    },

    info(message, opts) {
        if (message) {
            Message.info(message, {
                showClose: true,
                ...opts
            });
        }
    },

    success(message, opts) {
        if (message) {
            Message.success(message, {
                showClose: true,
                ...opts
            });
        }
    },

    warning(message, opts) {
        if (message) {
            Message.warning(message, {
                showClose: true,
                ...opts
            });
        }
    },

    error(message, opts) {
        if (message) {
            const defaultOpts = { showClose: true, ...opts };
            Message.error(message, defaultOpts);
        }
    },

    notify() {},

    prompt() {}
};
