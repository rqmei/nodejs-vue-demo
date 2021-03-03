<template>
    <div class="drawer-container">
        <div>
            <h3 class="drawer-title">全局设置</h3>

            <div class="drawer-item">
                <span>主题色</span>
                <theme-picker style="float: right;height: 26px;margin: -3px 8px 0 0;" @change="themeChange" />
            </div>

            <div class="drawer-item">
                <span>是否固定头部</span>
                <el-switch v-model="fixedHeader" class="drawer-switch" />
            </div>

            <div class="drawer-item">
                <span>是否显示LOGO</span>
                <el-switch v-model="sidebarLogo" class="drawer-switch" />
            </div>

            <div class="drawer-item">
                <span>是否显示面包屑</span>
                <el-switch v-model="showBreadcrumb" class="drawer-switch" />
            </div>

            <div class="drawer-item">
                <span>是否显示标签栏</span>
                <el-switch v-model="tagsView" class="drawer-switch" />
            </div>

            <div class="drawer-item">
                <span>标签栏样式</span>
                <el-select
                    :popper-class="popperClass"
                    v-model="tagsViewStyle"
                    placeholder="请选择"
                    size="mini"
                    style="width: 96px; float: right;"
                >
                    <el-option v-for="item in tagsViewStyleOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </div>
        </div>
    </div>
</template>

<script>
import ThemePicker from "@/components/base/ThemePicker";

export default {
    components: { ThemePicker },
    data() {
        return {
            popperClass: "drawer-select",
            tagsViewStyleOptions: [
                {
                    value: 1,
                    label: "简洁样式"
                },
                {
                    value: 2,
                    label: "简单样式"
                },
                {
                    value: 3,
                    label: "最全样式"
                }
            ]
        };
    },
    computed: {
        fixedHeader: {
            get() {
                return this.$store.state.settings.fixedHeader;
            },
            set(val) {
                this.$store.dispatch("settings/changeSetting", {
                    key: "fixedHeader",
                    value: val
                });
            }
        },
        tagsView: {
            get() {
                return this.$store.state.settings.tagsView;
            },
            set(val) {
                this.$store.dispatch("settings/changeSetting", {
                    key: "tagsView",
                    value: val
                });
            }
        },
        tagsViewStyle: {
            get() {
                return this.$store.state.settings.tagsViewStyle;
            },
            set(val) {
                this.$store.dispatch("settings/changeSetting", {
                    key: "tagsViewStyle",
                    value: val
                });
            }
        },
        sidebarLogo: {
            get() {
                return this.$store.state.settings.sidebarLogo;
            },
            set(val) {
                this.$store.dispatch("settings/changeSetting", {
                    key: "sidebarLogo",
                    value: val
                });
            }
        },
        showBreadcrumb: {
            get() {
                return this.$store.state.settings.showBreadcrumb;
            },
            set(val) {
                this.$store.dispatch("settings/changeSetting", {
                    key: "showBreadcrumb",
                    value: val
                });
            }
        }
    },
    methods: {
        themeChange(val) {
            this.$store.dispatch("settings/changeSetting", {
                key: "theme",
                value: val
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.drawer-container {
    padding: 24px;
    font-size: 14px;
    line-height: 1.5;
    word-wrap: break-word;

    .drawer-title {
        margin-bottom: 12px;
        color: rgba(0, 0, 0, 0.85);
        font-size: 14px;
        line-height: 22px;
    }

    .drawer-item {
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
        padding: 12px 0;
    }

    .drawer-switch {
        float: right;
    }
}
</style>

<style lang="scss">
// 复写select下拉样式
.drawer-select {
    z-index: 40001 !important;
}
</style>
