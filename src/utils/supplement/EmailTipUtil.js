let options = {
    el: "email-tip",
    // 事件KEY, 去除重复数据的
    keyTime: null,
    // 如果是代理对象, 如使用了Object.define或Object.proxy等对象的要引起数据变化的, 请注意在数据加载后再初始化此对象
    obj: null,
    // 代理对象的KEY
    key: null,
    element: {
        boxClazz: "email-tip-box",
        width: "400px",
        height: "300px",
        bgColor: "white",
        color: "#e9e9e9",
        zIndex: "555",
        border: "solid 1px #e5e5e5",
        listClazz: "email-recommend",
        listLeft: "16px",
        activeClazz: "active"
    },
    emailList: ["163.com", "qq.com", "126.com", "263.net", "gmail.com", "msn.com", "hotmail.com", "live.com"]
};

export default {
    init(opts) {
        options = Object.assign(options, opts);

        const that = this;
        const emailInputElement = this.getEmailInputElement();

        // 移除显示邮件推荐事件
        emailInputElement.removeEventListener("blur", this.removeEmailTipBox());
        emailInputElement.addEventListener("blur", this.removeEmailTipBox());

        // input按键事件
        function inputKeyUp(event) {
            if (options.keyTime === event.timeStamp) {
                return false;
            }

            options.keyTime = event.timeStamp;

            if (event.keyCode === 38) {
                that.upSelected();
            } else if (event.keyCode === 40) {
                that.downSelected();
            } else if (event.keyCode === 13) {
                that.setEmailInputValue();
            } else if (this.value && this.value.trim().length > 1) {
                that.removeEmailRecommend();
                that.createEmailTipBox(emailInputElement);
                that.createRecommendEmail(this.value);
            }

            return null;
        }

        emailInputElement.removeEventListener("keyup", inputKeyUp);
        emailInputElement.addEventListener("keyup", inputKeyUp);
    },

    removeEmailTipBox() {
        this.remove(options.element.boxClazz);
    },

    removeEmailRecommend() {
        this.remove(options.element.listClazz);
    },

    // 删除元素
    remove(clazz) {
        const childNode = document.getElementsByClassName(clazz || options.element.boxClazz);
        if (childNode) {
            for (let i = 0; i < childNode.length; i++) {
                childNode[i].remove();
            }
        }
    },

    // 获取激活的推荐元素
    getEmailRecommendActive() {
        const emailRecommendActive = document.querySelectorAll(`.${options.element.listClazz}.${options.element.activeClazz}`);
        return emailRecommendActive[0];
    },

    // 设置邮件推荐列表的背景色
    setEmailRecommendBg() {
        const emailRecommendActive = this.getEmailRecommendActive();

        if (emailRecommendActive) {
            emailRecommendActive.style["background-color"] = options.element.color;
        }
    },

    downSelected() {
        this.arrowSelected("down");
    },

    upSelected() {
        this.arrowSelected("up");
    },

    // 上下箭头选择时的效果
    arrowSelected(arrowStr) {
        const emailRecommendActive = this.getEmailRecommendActive();
        if (emailRecommendActive) {
            const { nextSibling, previousSibling } = emailRecommendActive;
            if (arrowStr === "up" && previousSibling) {
                emailRecommendActive.style["background-color"] = options.element.bgColor;
                emailRecommendActive.classList.remove(options.element.activeClazz);

                previousSibling.style["background-color"] = options.element.color;
                previousSibling.classList.add(options.element.activeClazz);
            } else if (arrowStr === "down" && nextSibling) {
                if (nextSibling) {
                    emailRecommendActive.style["background-color"] = options.element.bgColor;
                    emailRecommendActive.classList.remove(options.element.activeClazz);

                    nextSibling.style["background-color"] = options.element.color;
                    nextSibling.classList.add(options.element.activeClazz);
                }
            }
        }
    },

    // 创建邮件显示推荐条目
    createRecommendEmail(val, parentNode) {
        let parentNodeObj = parentNode;
        let valObj = val;
        if (!parentNodeObj) parentNodeObj = this.getEmailBox();

        // 清除所有显示的数据
        while (parentNodeObj.hasChildNodes()) {
            parentNodeObj.removeChild(parentNodeObj.firstChild);
        }

        // 创建邮件推荐列表, 如果已经输入@,则变更显示的值
        let emailRecommendList = options.emailList;
        if (valObj.indexOf("@") > -1) {
            const searchStr = valObj.substring(valObj.indexOf("@") + 1);
            valObj = valObj.substring(0, valObj.indexOf("@") + 1);
            emailRecommendList = options.emailList.filter(emailSuffix => emailSuffix.startsWith(searchStr));
        }

        const that = this;

        function mouseOverFunc() {
            const emailRecommendAll = document.querySelectorAll(`.${options.element.listClazz}`);
            emailRecommendAll.forEach(element => {
                element.style["background-color"] = options.element.bgColor;
            });

            this.style["background-color"] = options.element.color;
        }

        function mouseOutFunc() {
            this.style["background-color"] = options.element.bgColor;

            that.setEmailRecommendBg();
        }

        function clickFunc() {
            that.setEmailInputValue(this.innerText);
            // 激活input后再失效, 使邮件验证生效
            that.getEmailInputElement().focus();
        }

        for (let i = 0; i < emailRecommendList.length; i++) {
            const emailRecommendDiv = document.createElement("div");
            emailRecommendDiv.classList.add(options.element.listClazz);
            // 基础设置
            emailRecommendDiv.style.cursor = "pointer";
            emailRecommendDiv.style["background-color"] = options.element.bgColor;
            emailRecommendDiv.style["padding-left"] = options.element.listLeft;

            // 默认选中
            if (i === 0) {
                emailRecommendDiv.classList.add(options.element.activeClazz);
                emailRecommendDiv.style["background-color"] = options.element.color;
            }

            // 设定推荐邮件事件
            emailRecommendDiv.addEventListener("mouseover", mouseOverFunc);
            emailRecommendDiv.addEventListener("mouseout", mouseOutFunc);
            emailRecommendDiv.addEventListener("click", clickFunc);

            // 设定显示的值
            let showText;
            if (valObj.indexOf("@") > -1) {
                showText = `${valObj}${emailRecommendList[i]}`;
            } else {
                showText = `${valObj}@${emailRecommendList[i]}`;
            }

            // 附加到父元素
            const text = document.createTextNode(showText);
            emailRecommendDiv.appendChild(text);
            parentNodeObj.appendChild(emailRecommendDiv);
        }
    },

    // 创建邮件提示显示外框
    createEmailTipBox(node) {
        if (node && node.value && node.value.trim().length > 1) {
            const emailTipBoxExists = document.getElementsByClassName(options.element.boxClazz);

            let emailTipBox = null;
            if (emailTipBoxExists.length === 0) {
                // 创建显示元素
                emailTipBox = document.createElement("div");
                emailTipBox.classList.add(options.element.boxClazz);
                emailTipBox.style.width = node.style.width || options.element.width;
                emailTipBox.style.height = options.element.height;
                emailTipBox.style["background-color"] = options.element.bgColor;
                emailTipBox.style.position = "absolute";
                emailTipBox.style["z-index"] = options.element.zIndex;
                emailTipBox.style.border = options.element.border;

                node.parentNode.appendChild(emailTipBox);
            }
        }
    },

    // 获取父例子
    getEmailBox() {
        const emailTipBoxDiv = document.getElementsByClassName("email-tip-box");
        return emailTipBoxDiv[0];
    },

    // 设置目标email的值
    setEmailInputValue(val) {
        let valObj = val;
        if (!valObj) {
            const emailRecommendActive = this.getEmailRecommendActive();
            if (emailRecommendActive) {
                valObj = emailRecommendActive.innerText;
            }
        }

        if (valObj) {
            if (options.obj && options.key) {
                options.obj[options.key] = valObj;
                this.getEmailInputElement().value = valObj;
            } else {
                this.getEmailInputElement().value = valObj;
            }
        }

        console.log(options.obj);

        this.removeEmailTipBox();
    },

    // 获取邮件元素
    getEmailInputElement() {
        const emailInputElements = document.querySelectorAll(`input[${options.el}]`);

        let emailInputElement;
        if (emailInputElements && emailInputElements.length === 1) {
            emailInputElement = emailInputElements[0];
        } else if (emailInputElements.length > 1) {
            for (let i = 0; i < emailInputElements.length; i++) {
                const emailInputElementOne = emailInputElements[i];
                if (emailInputElementOne === document.activeElement) {
                    emailInputElement = emailInputElementOne;
                    break;
                }
            }
        }
        return emailInputElement;
    }
};
