export default {
    /**
     * @param {string} val
     * @returns {string}
     */
    html2Text(val) {
        const div = document.createElement("div");
        div.innerHTML = val;
        return div.textContent || div.innerText;
    },

    /**
     * @param {HTMLElement} element
     * @param {string} className
     */
    toggleClass(element, className) {
        if (!element || !className) {
            return;
        }
        let classString = element.className;
        const nameIndex = classString.indexOf(className);
        if (nameIndex === -1) {
            classString += `${className}`;
        } else {
            classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length);
        }
        // eslint-disable-next-line no-param-reassign
        element.className = classString;
    },

    /**
     * 判断是否有此class
     * @param {HTMLElement} elm
     * @param {string} cls
     * @returns {boolean}
     */
    hasClass(ele, cls) {
        return !!ele.className.match(new RegExp(`(\\s|^)${cls}(\\s|$)`));
    },

    /**
     * 新增class
     * @param {HTMLElement} elm
     * @param {string} cls
     */
    addClass(ele, cls) {
        // eslint-disable-next-line no-param-reassign
        if (!this.hasClass(ele, cls)) ele.className += ` ${cls}`;
    },

    /**
     * 删除class
     * @param {HTMLElement} elm
     * @param {string} cls
     */
    removeClass(ele, cls) {
        if (this.hasClass(ele, cls)) {
            const reg = new RegExp(`(\\s|^)${cls}(\\s|$)`);
            // eslint-disable-next-line no-param-reassign
            ele.className = ele.className.replace(reg, " ");
        }
    }
};
