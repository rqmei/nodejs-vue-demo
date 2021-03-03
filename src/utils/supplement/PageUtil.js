import defaultSettings from "@/settings.js";

const title = defaultSettings.title || "替比营销系统";

export default {
    getPageTitle(pageTitle) {
        if (pageTitle) {
            return `${pageTitle} - ${title}`;
        }
        return `${title}`;
    }
};
