<template>
    <div id="tags-view-container" class="tags-view-container">
        <div v-if="tagsViewStyle > 1" class="tags-view-operate tags-view-operate-arrow-left" @click="scrollToLeft">
            <span class="el-icon-d-arrow-left" />
        </div>
        <div v-if="tagsViewStyle > 2" class="tags-view-operate tags-view-operate-setting" @click.prevent="openMenuWithSetting($event)">
            <span class="el-icon-setting" />
        </div>
        <div v-if="tagsViewStyle > 1" class="tags-view-operate tags-view-operate-arrow-right" @click="scrollToRight">
            <span class="el-icon-d-arrow-right" />
        </div>
        <scroll-pane ref="scrollPane" class="tags-view-wrapper">
            <router-link
                v-for="tag in visitedViews"
                ref="tag"
                :key="tag.path"
                :class="getItemClazz(tag)"
                :to="{
                    path: tag.path,
                    query: tag.query,
                    fullPath: tag.fullPath
                }"
                tag="span"
                class="tags-view-item"
                @click.middle.native="!isAffix(tag) ? closeSelectedTag(tag) : ''"
                @contextmenu.prevent.native="openMenu(tag, $event)"
            >
                {{ tag.title }}
                <span v-if="!isAffix(tag)" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)" />
            </router-link>
        </scroll-pane>
        <ul v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
            <li @click="refreshSelectedTag(selectedTag)">刷新</li>
            <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">
                关闭
            </li>
            <li @click="closeOthersTags">关闭其它</li>
            <li @click="closeAllTags(selectedTag)">关闭所有</li>
        </ul>
    </div>
</template>

<script>
import path from "path";
import ScrollPane from "./ScrollPane";
import Constants from "../../../utils/constants/Constants.js";
import RoutePathConstants from "../../../utils/constants/RoutePathConstants.js";
import TagViewManager from "../../../utils/route/TagViewManager";

export default {
    components: { ScrollPane },
    data() {
        return {
            visible: false,
            top: 0,
            left: 0,
            selectedTag: {},
            currTag: {},
            affixTags: []
        };
    },
    computed: {
        visitedViews() {
            return this.$store.state.tagsView.visitedViews;
        },
        routes() {
            return this.$store.state.permission.routes;
        },
        tagsViewStyle() {
            return this.$store.state.settings.tagsViewStyle;
        }
    },
    watch: {
        $route() {
            this.addTags();
            this.moveToCurrentTag();
        },
        visible(value) {
            if (value) {
                document.body.addEventListener("click", this.closeMenu);
            } else {
                document.body.removeEventListener("click", this.closeMenu);
            }
        }
    },
    mounted() {
        this.initTags();
        this.addTags();
    },
    methods: {
        getItemClazz(route) {
            let clazz = "";
            if (this.isActive(route)) clazz += " active";
            if (this.tagsViewStyle) clazz += ` tags-view-item-style${this.tagsViewStyle}`;
            return clazz;
        },
        isActive(route) {
            return TagViewManager.isActive(route);
        },
        isAffix(tag) {
            return tag.meta && tag.meta.affix;
        },
        filterAffixTags(routes, basePath = "/") {
            let tags = [];
            routes.forEach(route => {
                if (route.meta && route.meta.affix) {
                    const tagPath = path.resolve(basePath, route.path);
                    tags.push({
                        fullPath: tagPath,
                        path: tagPath,
                        name: route.name,
                        meta: { ...route.meta }
                    });
                }
                if (route.children) {
                    const tempTags = this.filterAffixTags(route.children, route.path);
                    if (tempTags.length >= 1) {
                        tags = [...tags, ...tempTags];
                    }
                }
            });
            return tags;
        },
        initTags() {
            const affixTags = (this.affixTags = this.filterAffixTags(this.routes));
            for (const tag of affixTags) {
                // 标签必须有名称
                if (tag.name) {
                    this.$store.dispatch("tagsView/addVisitedView", tag);
                }
            }
        },
        addTags() {
            const { name } = this.$route;
            if (name) {
                this.$store.dispatch("tagsView/addView", this.$route);
            }
            return false;
        },
        moveToCurrentTag() {
            const tags = this.$refs.tag;
            this.$nextTick(() => {
                for (const tag of tags) {
                    if (tag.to.path === this.$route.path) {
                        this.$refs.scrollPane.moveToTarget(tag);
                        if (tag.to.fullPath !== this.$route.fullPath) {
                            this.$store.dispatch("tagsView/updateVisitedView", this.$route);
                        }
                        break;
                    }
                }
            });
        },
        refreshSelectedTag(view) {
            this.$store.dispatch("tagsView/delCachedView", view).then(() => {
                const { fullPath } = view;
                this.$nextTick(() => {
                    this.$router.replace({
                        path: `/redirect${fullPath}`
                    });
                });
            });
        },
        closeSelectedTag(view) {
            TagViewManager.removeTab(view.path);
            // this.$store.dispatch("tagsView/delView", view).then(({ visitedViews }) => {
            //     if (this.isActive(view)) {
            //         this.toLastView(visitedViews, view);
            //     }
            // });
        },
        closeOthersTags() {
            this.$router.push(this.selectedTag);
            this.$store.dispatch("tagsView/delOthersViews", this.selectedTag).then(() => {
                this.moveToCurrentTag();
            });
        },
        closeAllTags(view) {
            this.$store.dispatch("tagsView/delAllViews").then(({ visitedViews }) => {
                if (this.affixTags.some(tag => tag.path === view.path)) {
                    return;
                }
                this.toLastView(visitedViews, view);
            });
        },
        toLastView(visitedViews, view) {
            TagViewManager.toLastView(visitedViews, view);
        },
        openMenu(tag, e) {
            const menuMinWidth = 105;
            // 左边距
            const offsetLeft = this.$el.getBoundingClientRect().left;
            // 容器高度
            const { offsetWidth } = this.$el;
            // 左边界距离
            const maxLeft = offsetWidth - menuMinWidth;
            const left = e.clientX - offsetLeft + 15;

            if (left > maxLeft) {
                this.left = maxLeft;
            } else {
                this.left = left;
            }

            // e.offsetY 鼠标位置或者固定高度
            this.top = 33;
            this.visible = true;
            if (tag) this.selectedTag = tag;
        },
        openMenuWithSetting(e) {
            // 侧边菜单栏宽度
            const sideBarWidth = 180;
            // 右键菜单宽度
            const contextWidth = 80;
            this.left = e.clientX - sideBarWidth - contextWidth;
            this.top = 33;
            this.visible = true;

            this.selectedTag = {
                path: this.$route.path,
                fullPath: this.$route.fullPath
            };
        },

        closeMenu(event) {
            // 如果是设置按钮则不关闭
            const { classList } = event.target;
            if (classList.contains("tags-view-operate") || classList.contains("el-icon-setting")) {
                return false;
            }
            this.visible = false;
            return false;
        },

        /**
         * 滚动到最左边
         */
        scrollToLeft() {
            this.$nextTick(() => {
                if (this.$refs.scrollPane) {
                    this.$refs.scrollPane.moveToLeft();
                }
            });
        },

        /**
         * 滚动到右边
         */
        scrollToRight() {
            this.$nextTick(() => {
                if (this.$refs.scrollPane) {
                    this.$refs.scrollPane.moveToRight();
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.tags-view-container {
    height: 34px;
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
    position: relative;
    .tags-view-wrapper {
        .tags-view-item {
            display: inline-block;
            position: relative;
            cursor: pointer;
            height: 26px;
            line-height: 26px;
            border: 1px solid #d8dce5;
            color: #495060;
            background: #fff;
            padding: 0 8px;
            font-size: 12px;
            margin-left: 3px;
            margin-top: 4px;
            &:first-of-type {
                margin-left: 3px;
            }
            &:last-of-type {
                margin-right: 3px;
            }
            &.active {
                // 42b983 主题色409EFF
                background-color: #409eff;
                color: #fff;
                border-color: #409eff;
                &::before {
                    content: "";
                    background: #fff;
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    position: relative;
                    margin-right: 2px;
                }
            }
        }

        .tags-view-item-style1 {
            &:first-of-type {
                margin-left: 3px;
            }
            &:last-of-type {
                margin-right: 3px;
            }
        }
        .tags-view-item-style2 {
            &:first-of-type {
                margin-left: 25px;
            }
            &:last-of-type {
                margin-right: 25px;
            }
        }
        .tags-view-item-style3 {
            &:first-of-type {
                margin-left: 25px;
            }
            &:last-of-type {
                margin-right: 50px;
            }
        }
    }

    .tags-view-operate {
        display: inline-block;
        position: absolute;
        z-index: 1;
        height: 33px;
        line-height: 34px;
        text-align: center;
        width: 25px;
        background: #fff;
        &.tags-view-operate-setting {
            right: 25px;
        }
        &.tags-view-operate-arrow-right {
            right: 0;
        }
        &:hover {
            background: #e5e5e5;
            cursor: pointer;
            color: #78adff;
        }
    }

    .contextmenu {
        margin: 0;
        background: #fff;
        z-index: 100;
        position: absolute;
        list-style-type: none;
        padding: 5px 0;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 400;
        color: #333;
        box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
        li {
            margin: 0;
            padding: 7px 16px;
            cursor: pointer;
            &:hover {
                background: #eee;
            }
        }
    }
}
</style>

<style lang="scss">
// 重置element的el-icon-close
.tags-view-wrapper {
    .tags-view-item {
        .el-icon-close {
            width: 16px;
            height: 16px;
            vertical-align: 2px;
            border-radius: 50%;
            text-align: center;
            transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
            transform-origin: 100% 50%;
            &:before {
                transform: scale(0.6);
                display: inline-block;
                vertical-align: -3px;
            }
            &:hover {
                background-color: #b4bccc;
                color: #fff;
            }
        }
    }
}
</style>
