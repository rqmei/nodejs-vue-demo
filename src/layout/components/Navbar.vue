<template>
    <div class="navbar">
        <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

        <breadcrumb v-if="showBreadcrumb" id="breadcrumb-container" class="breadcrumb-container" />

        <div class="right-content-wrapper">
            <div class="avatar-img-wrapper">
                <img :src="avatar" class="user-avatar" />
            </div>
            <div class="real-name-wrapper">
                李二
            </div>
            <div class="log-out-wrapper" @click="logout">
                <span>退出</span>
            </div>
        </div>

        <!--        <div class="right-menu">-->
        <!--            <template v-if="device !== 'mobile'">-->
        <!--                <search id="header-search" class="right-menu-item" />-->

        <!--                <error-log class="errLog-container right-menu-item hover-effect" />-->

        <!--                <screenfull id="screenfull" class="right-menu-item hover-effect" />-->

        <!--                <el-tooltip content="框架默认大小" effect="dark" placement="bottom">-->
        <!--                    <size-select id="size-select" class="right-menu-item hover-effect" />-->
        <!--                </el-tooltip>-->
        <!--            </template>-->
        <!--            <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">-->
        <!--                <div class="avatar-wrapper">-->
        <!--                    <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar" />-->
        <!--                    <i class="el-icon-caret-bottom" />-->
        <!--                </div>-->
        <!--                <el-dropdown-menu slot="dropdown">-->
        <!--                    <router-link to="/profile/index">-->
        <!--                        <el-dropdown-item>个人资料</el-dropdown-item>-->
        <!--                    </router-link>-->
        <!--                    <router-link to="/">-->
        <!--                        <el-dropdown-item>首页</el-dropdown-item>-->
        <!--                    </router-link>-->
        <!--                    <a target="_blank" href="#">-->
        <!--                        <el-dropdown-item>文档</el-dropdown-item>-->
        <!--                    </a>-->
        <!--                    <el-dropdown-item divided @click.native="logout">-->
        <!--                        <span style="display:block;">退出</span>-->
        <!--                    </el-dropdown-item>-->
        <!--                </el-dropdown-menu>-->
        <!--            </el-dropdown>-->
        <!--        </div>-->
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/base/Breadcrumb";
import Hamburger from "@/components/base/Hamburger";
import ErrorLog from "@/components/base/ErrorLog";
import Screenfull from "@/components/base/Screenfull";
import SizeSelect from "@/components/base/SizeSelect";
import Search from "@/components/base/HeaderSearch";
import UserUtil from "../../utils/user/UserUtil";

export default {
    components: {
        Breadcrumb,
        Hamburger,
        ErrorLog,
        Screenfull,
        SizeSelect,
        Search
    },
    computed: {
        ...mapGetters(["sidebar", "avatar", "device"]),
        showBreadcrumb() {
            // const result = this.$store.state.settings.showBreadcrumb && this.$store.state.settings.tagsView;
            const result = this.$store.state.settings.showBreadcrumb;
            return result;
        }
    },
    methods: {
        toggleSideBar() {
            this.$store.dispatch("app/toggleSideBar");
        },

        async logout() {
            UserUtil.logout().then(res => {});
            // await this.$store.dispatch("user/logout");
        }
    }
};
</script>

<style lang="scss">
.navbar {
    height: 40px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

    .hamburger-container {
        line-height: 40px;
        height: 100%;
        float: left;
        cursor: pointer;
        transition: background 0.3s;
        -webkit-tap-highlight-color: transparent;

        &:hover {
            background: rgba(0, 0, 0, 0.025);
        }
    }

    .breadcrumb-container {
        float: left;
        .el-breadcrumb__item {
            line-height: 40px;
        }
    }

    .errLog-container {
        display: inline-block;
        vertical-align: top;
    }

    // 右侧内容布局
    .right-content-wrapper {
        float: right;
        height: 100%;
        line-height: 40px;
        display: flex;
        align-items: center;
        font-size: 16px;
        color: #5a5e66;
        &:focus {
            outline: none;
        }
        // 头像
        .avatar-img-wrapper {
            margin-right: 10px;
            display: flex;
            align-items: center;
            .user-avatar {
                cursor: pointer;
                width: 30px;
                height: 30px;
                border-radius: 15px;
            }
        }
        // 真实姓名
        .real-name-wrapper {
            margin-right: 30px;
            cursor: pointer;
        }

        // 退出
        .log-out-wrapper {
            margin-right: 20px;
            cursor: pointer;
            :hover {
                color: #409eff;
            }
        }
    }
    .right-menu {
        float: right;
        height: 100%;
        line-height: 50px;

        &:focus {
            outline: none;
        }

        .right-menu-item {
            display: inline-block;
            padding: 0 8px;
            height: 100%;
            font-size: 18px;
            color: #5a5e66;
            vertical-align: text-bottom;

            &.hover-effect {
                cursor: pointer;
                transition: background 0.3s;

                &:hover {
                    background: rgba(0, 0, 0, 0.025);
                }
            }
        }

        .avatar-container {
            margin-right: 30px;

            .avatar-wrapper {
                margin-top: 5px;
                position: relative;

                .user-avatar {
                    cursor: pointer;
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                }

                .el-icon-caret-bottom {
                    cursor: pointer;
                    position: absolute;
                    right: -20px;
                    top: 25px;
                    font-size: 12px;
                }
            }
        }
    }
}
</style>
