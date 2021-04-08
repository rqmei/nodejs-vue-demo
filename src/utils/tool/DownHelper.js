/**
 * 下载文件
 */
import GlobalHelper from "./GlobalHelper.js";

export default {
    /**
     * 获取 blob
     * @param  {String} url 目标文件地址
     * @return {cb} 回调方法
     */
    getBlob(url, cb) {
        // 获取用于与服务器交互的对象
        const xhr = new XMLHttpRequest();
        // 初始化一个请求
        xhr.open("GET", url, true);
        // 设置响应类型
        xhr.responseType = "blob";
        // 请求成功完成时触发。
        xhr.onload = function() {
            if (xhr.status === 200) {
                cb(xhr.response);
            }
        };
        // 发送请求
        xhr.send();
    },

    /**
     * 保存
     * @param  {Blob} blob 文件对象
     * @param  {String} filename 想要保存的文件名称
     */
    saveAs(blob, filename) {
        // navigator 提供浏览器相关信息
        // 浏览器是否提供保存和打开按钮
        if (window.navigator.msSaveOrOpenBlob) {
            // 提供保存按钮
            navigator.msSaveBlob(blob, filename);
        } else {
            // 生成一个a元素
            const link = document.createElement("a");
            //  querySelector() 方法仅仅返回匹配指定选择器的第一个元素
            const body = document.querySelector("body");

            // 设置链接资源
            link.href = window.URL.createObjectURL(blob);
            link.download = filename;

            // fix Firefox
            link.style.display = "none";
            body.appendChild(link);

            link.click();
            body.removeChild(link);

            // revokeObjectURL() 静态方法用来释放一个之前已经存在的、通过调用 URL.createObjectURL() 创建的 URL 对象
            window.URL.revokeObjectURL(link.href);
        }
    },

    /**
     * 下载
     * @param  {String} url 目标文件地址
     * @param  {String} filename 想要保存的文件名称
     */
    download(url, filename) {
        if (filename == null || filename.length == 0) {
            GlobalHelper.downWithUrl(url);
        } else {
            const that = this;
            this.getBlob(url, function(blob) {
                that.saveAs(blob, filename);
            });
        }
    },
    /**
     * 根据图片路径下载图片-解决跨域问题
     *
     * @param imgsrc 图片地址
     * @param name 保存的图片名
     */
    downloadImage(imgSrc, name) {
        var image = new Image();
        // 解决跨域 Canvas 污染问题,
        image.setAttribute("crossorigin", "anonymous");
        image.onload = function () {
            var canvas = document.createElement("canvas");
            canvas.width = image.width;
            canvas.height = image.height;
            var context = canvas.getContext("2d");
            context.drawImage(image, 0, 0, image.width, image.height);
            var url = canvas.toDataURL("image/png"); // 将图片格式转为base64
            var a = document.createElement("a"); // 生成一个a元素
            var event = new MouseEvent("click"); // 创建一个单击事件
            a.download = name || "myPhoto"; // 设置图片名称
            a.href = url; // 将生成的URL设置为a.href属性
            a.dispatchEvent(event); // 触发a的单击事件
        };
        image.src = imgSrc + '?time=' + Date.now();  // 注意，这里是灵魂，否则依旧会产生跨域问题

    }
};
