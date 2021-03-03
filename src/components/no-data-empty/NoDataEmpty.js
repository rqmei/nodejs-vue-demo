export default {
    name: "NoDataEmpty",
    props: {
        /**
         * 标题
         */
        title: {
            type: String,
            default: "没有数据"
        },
        /**
         * 没有数据图片
         */
        noDataImage: {
            type: String
        },
        /**
         *  是否有操作按钮
         * */
        isHasOperation: {
            type: Boolean,
            default: false
        },
        /**
         *  操作按钮文字
         * */
        operationTitle: {
            type: String,
            default: "刷新数据"
        }
    },
    data() {
        return {};
    },
    methods: {
        /**
         * 点击没有数据按钮事件
         * */
        onClickButtonEvent() {
            if (!this.isHasOperation) {
                return;
            }
            this.$emit("call-back");
        },

        /**
         * 获取标题
         */
        getNoDataTitle() {
            if (this.title == null || this.title.length === 0) {
                return "没有数据";
            }
            return this.title;
        },
        /**
         * 获取没有数据图片
         */
        getNoDataImage() {
            if (this.noDataImage == null || this.noDataImage.length === 0) {
                return require("../../assets/img/error/error_no_data.png");
            }
            return this.noDataImage;
        }
    }
};
