<template>
    <transition name="fade">
        <!-- 蒙版 -->
        <div class="window-custom-mask-wrap" v-if="options.isVisible" @click.stop="onClickCloseEvent">
            <div class="window-container-wrap">
                <!--头部-->
                <div class="container-header">
                    <div class="title-header-wrap" v-if="options.title != null && options.title.length != 0">{{ options.title }}</div>
                    <div class="close-icon-wrap" v-if="options.showClose" @click.stop="onClickCloseEvent">
                        <i class="el-icon-close"></i>
                    </div>
                </div>
                <!--内容-->
                <div class="container-content">
                    <div class="title-content-wrap" v-if="options.content != null && options.content.length != 0">
                        {{ options.content }}
                    </div>
                </div>
                <!--底部-->
                <div class="container-footer" v-if="options.isContainerCancel">
                    <div class="cancel-button" @click.stop="onClickCancleEvent">{{ options.cancelButtonTitle }}</div>
                    <div class="ensure-button" @click.stop="onClickEnsureEvent">{{ options.ensureButtonTitle }}</div>
                </div>
                <div class="container-footer" v-else>
                    <div class="ensure-button" @click.stop="onClickEnsureEvent">{{ options.ensureButtonTitle }}</div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: "WindowDialog",
    data() {
        return {
            options: {
                isVisible: false,
                /**
                 *  标记
                 * */
                tag: 0,
                /**
                 * 是否关闭按钮
                 */
                showClose: false,
                /**
                 * 标题
                 */
                title: "温馨提示",
                /**
                 * 内容
                 */
                content: "请进行以下操作",
                /**
                 * 是否包含取消按钮
                 * */
                isContainerCancel: true,
                /**
                 * 取消按钮
                 * */
                cancelButtonTitle: "取消",
                /**
                 * 确定按钮
                 * */
                ensureButtonTitle: "确定",
                /**
                 * 是否背景使能事件
                 * */
                isEnabledMaskEvent: true
            },
            /**
             *  回调
             * */
            callBack: null
        };
    },
    methods: {
        /**
         *  点击确定按钮
         */
        onClickEnsureEvent() {
            this.close();
            if (this.callBack) {
                this.callBack({ type: 1, tag: this.options.tag });
            }
        },
        /**
         * 取消弹框
         */
        onClickCancleEvent() {
            this.close();
            if (this.options.isContainerCancel) {
                if (this.callBack) {
                    this.callBack({ type: 0, tag: this.options.tag });
                }
            }
        },
        /**
         *  点击关闭
         * */
        onClickCloseEvent() {
            this.close();
            if (this.options.isEnabledMaskEvent) {
                if (this.callBack) {
                    this.callBack({ type: 0, tag: this.options.tag });
                }
            }
        },
        /**
         *  显示弹框
         * */
        showWindowAlert(options, callBack) {
            Object.assign(this.options, options);

            this.callBack = callBack;
            this.options.isVisible = true;
        },

        /**
         *  取消弹框
         * */
        dismissWindowAlert() {
            this.onClickCancleEvent();
        },

        /**
         * 关闭
         */
        close() {
            this.options.isVisible = false;
        }
    }
};
</script>

<style lang="scss">
// 渐变过渡
.fade-enter,
.fade-leave-active {
    opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.35s;
}
// 全局弹窗
.window-custom-mask-wrap {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 2002;
    background: rgba(0, 0, 0, 0.4);
    .window-container-wrap {
        display: inline-block;
        width: 420px;
        margin-top: 15%;
        vertical-align: middle;
        background-color: #fff;
        border-radius: 4px;
        border: 1px solid #ebeef5;
        -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        text-align: center;
        overflow: hidden;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        font-size: 16px;
        color: #333333;
        // 头部
        .container-header {
            padding: 10px 0px;
            margin-left: 10px;
            margin-right: 10px;
            text-align: left;
            border-bottom: 1px solid rgba(230, 230, 230, 1);
            display: flex;
            justify-content: space-between;

            .close-icon-wrap {
            }
        }

        // 内容
        .container-content {
            padding: 30px;
            display: block;
            text-align: center;
        }

        //底部
        .container-footer {
            padding: 20px;
            display: flex;
            justify-content: center;
            font-size: 14px;
            font-family: MicrosoftYaHei;
            //取消按钮
            .cancel-button {
                width: 90px;
                height: 36px;
                padding: 0px;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 4px;
                box-sizing: border-box;

                background: #ffffff;
                color: #409eff;
                border: 1px solid rgba(64, 158, 255, 1);
                margin-right: 20px;
            }

            // 右边
            .ensure-button {
                width: 90px;
                height: 36px;
                padding: 0px;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 4px;
                box-sizing: border-box;

                background: #409eff;
                color: #ffffff;
            }
        }
    }
}
</style>
