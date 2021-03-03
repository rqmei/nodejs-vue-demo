import CommonUtil from "../global/CommonUtil.js";

export default {
    /**
     * @param {Array} actual
     * @returns {Array}
     */
    cleanArray(actual) {
        const newArray = [];
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < actual.length; i++) {
            if (actual[i]) {
                newArray.push(actual[i]);
            }
        }
        return newArray;
    },

    /**
     * @param {Array} arr
     * @returns {Array}
     */
    uniqueArr(arr) {
        return Array.from(new Set(arr));
    },

    /**
     * 对数据进行分类
     * @param arr
     */
    classifyArr(arr, classifyArr) {
        console.log(arr, classifyArr);
    },

    /**
     * 对数据进行分类, 将listmap类型的数据转为多个对象
     * @param arr
     */
    classifyArrToObj(dataArr, classifyArr, keyCode, keyValue) {
        const classifyObj = {};

        for (let i = 0; i < classifyArr.length; i++) {
            const classify = classifyArr[i];
            const classifySubObj = {};

            for (let j = 0; j < dataArr.length; j++) {
                const data = dataArr[j];

                if (data[keyCode].startsWith(classify)) {
                    classifySubObj[CommonUtil.toHump(data[keyCode])] = data;
                }
            }
            classifyObj[CommonUtil.toHump(classify)] = classifySubObj;
        }

        return classifyObj;
    }
};
