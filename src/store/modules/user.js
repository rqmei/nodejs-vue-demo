/* eslint-disable */
import loginApi from "../../api/login/LoginApi.js";
import TokenUtil from "../../utils/db/TokenUtil.js";
import router, { resetRouter } from "../../router";
import DeviceHelper from "../../utils/tool/DeviceHelper";
import Constants from "../../utils/constants/Constants";

const state = {
    token: TokenUtil.getToken(),
    roles: [],
    permissions: [],
    userData: {}
};

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token;
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles;
    },
    SET_PERMISSIONS: (state, permissions) => {
        state.permissions = permissions;
    },
    SET_USER_DATA: (state, userData) => {
        state.userData = userData;
    }
};

const actions = {
    // 用户登录
    login({ commit }, userInfo) {
        return new Promise((resolve, reject) => {
            const param = userInfo;
            const requestParam = DeviceHelper.getBrowserInfo(param);
            loginApi
                .login(requestParam)
                .then(response => {
                    const userData = response.data;
                    if (userData) {
                        commit("SET_USER_DATA", userData);
                    }

                    // 保存token 信息
                    if (userData && userData.token) {
                        commit("SET_TOKEN", userData.token);
                        TokenUtil.setToken(userData.token);
                    }

                    // 必须要有角色信息, 没有角色默认角色
                    if (userData && userData.roles) {
                        commit("SET_ROLES", userData.roles);
                    } else {
                        commit("SET_ROLES", [Constants.defaultSystemRole]);
                    }

                    // 权限
                    if (userData && userData.permissions) {
                        commit("SET_PERMISSIONS", userData.permissions);
                    }
                    if (resolve) {
                        resolve(response);
                    }
                })
                .catch(error => {
                    reject(error);
                });
        });
    },

    // 获取用户信息, 指组装信息, 数据从本地获取
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            const userData = state.userData;
            if (userData && userData.roles) {
                commit("SET_ROLES", userData.roles);
            }

            if (userData && userData.permissions) {
                commit("SET_PERMISSIONS", userData.permissions);
            }
            if (userData && userData.realName) {
                commit("SET_REAL_NAME", userData.realName);
            }
            resolve(state.userData);
        });
    },

    // 用户退出
    logout({ commit, state, dispatch }) {
        return new Promise((resolve, reject) => {
            const param = {
                userId: state.userData.userId
            };

            loginApi
                .logout(param)
                .then(response => {
                    // if (response.code !== 0) {
                    //     console.error("退出失败!");
                    // }

                    commit("SET_TOKEN", "");
                    commit("SET_ROLES", []);
                    TokenUtil.removeToken();
                    resetRouter();

                    dispatch("tagsView/delAllViews", null, { root: true });

                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },

    // 删除token，TODO 删除本地信息
    resetToken({ commit }) {
        return new Promise(resolve => {
            commit("SET_TOKEN", "");
            commit("SET_ROLES", []);
            TokenUtil.removeToken();
            resolve();
        });
    },

    // 动态变更角色及权限
    changeRoles({ commit, dispatch }, role) {
        return new Promise(async resolve => {
            const token = `${role}-token`;

            commit("SET_TOKEN", token);
            TokenUtil.setToken(token);

            const { roles } = await dispatch("getInfo");

            resetRouter();

            // 生成可用的菜单
            const accessRoutes = await dispatch("permission/generateRoutes", roles, { root: true });

            // 添加路由
            // router.addRoutes(accessRoutes);

            // 重置标签
            dispatch("tagsView/delAllViews", null, { root: true });

            resolve();
        });
    },
    /**
     * 移除所有用户数据
     */
    removeAllUserData({ commit }) {
        commit("SET_TOKEN", "");
        commit("SET_ROLES", []);
        commit("SET_USER_DATA", {});
        commit("SET_PERMISSIONS", {});
        TokenUtil.removeToken();
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
