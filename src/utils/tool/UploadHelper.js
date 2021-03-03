import HudGlobal from "../hud/HudGlobal.js";

/**
 * 上传文件
 */
export default {
    /**
     * 检测上传图片格式 png jpg jpeg
     * @param file
     * @returns {boolean}
     */
    checkUploadImageFormat(file) {
        if (file == null) {
            return false;
        }
        const isJPG = file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg";
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
            HudGlobal.showWarningWithMessage("上传图片只能是 JPG/PNG/JPEG 格式!");
        }
        if (!isLt2M) {
            HudGlobal.showWarningWithMessage("上传图片大小不能超过 2MB!");
        }
        return isJPG && isLt2M;
    },
    /**
     * 检测上传文件格式
     */
    checkUploadFileFormat(file) {
        if (file == null) {
            return false;
        }
        const fileArray = file.name.split(".");
        if (fileArray == null || fileArray.length < 2) {
            return false;
        }
        const fileName = fileArray.pop();
        const sourceNames = ["xls", "xlsx", "doc", "docx", "ppt", "pptx", "pdf", "png", "jpg", "jpeg"];
        const result = sourceNames.indexOf(fileName) != -1;
        if (!result) {
            HudGlobal.showWarningWithMessage("请检测文件格式");
        } else {
        }
        return result;
    },
    /**
     * 检测导入文件的格式
     */
    checkImportFileFormat(file) {
        if (file == null) {
            return false;
        }
        const fileArray = file.name.split(".");
        if (fileArray == null || fileArray.length < 2) {
            return false;
        }
        const fileName = fileArray.pop();
        const sourceNames = ["xls", "xlsx"];
        const result = sourceNames.indexOf(fileName) != -1;
        if (!result) {
            HudGlobal.showWarningWithMessage("请检测文件格式");
        } else {
        }
        return result;
    }
};
