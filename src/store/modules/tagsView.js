/* eslint-disable */

const state = {
    visitedViews: [],
    cachedViews: []
};

const mutations = {
    ADD_VISITED_VIEW: (state, view) => {
        if (state.visitedViews.some(v => v.path === view.path)) return;

        state.visitedViews.push({
            // 有递归危险
            // ...view,
            fullPath: view.fullPath,
            meta: view.meta,
            name: view.name,
            params: view.params,
            path: view.path,
            query: view.query,
            title: view.meta.title || "no-name"
        });
    },

    ADD_CACHED_VIEW: (state, view) => {
        if (state.cachedViews.includes(view.name)) return;
        if (!view.meta.noCache) {
            state.cachedViews.push(view.name);
        }
    },

    DEL_VISITED_VIEW: (state, view) => {
        for (const [i, v] of state.visitedViews.entries()) {
            if (v.path === view.path) {
                state.visitedViews.splice(i, 1);
                break;
            }
        }
    },

    DEL_CACHED_VIEW: (state, view) => {
        const index = state.cachedViews.indexOf(view.name);
        index > -1 && state.cachedViews.splice(index, 1);
    },

    DEL_OTHERS_VISITED_VIEWS: (state, view) => {
        state.visitedViews = state.visitedViews.filter(v => {
            return v.meta.affix || v.path === view.path;
        });
    },

    DEL_OTHERS_CACHED_VIEWS: (state, view) => {
        const index = state.cachedViews.indexOf(view.name);
        if (index > -1) {
            state.cachedViews = state.cachedViews.slice(index, index + 1);
        } else {
            // index = -1表示没有标签了
            state.cachedViews = [];
        }
    },

    DEL_ALL_VISITED_VIEWS: state => {
        // 固定标签
        const affixTags = state.visitedViews.filter(tag => tag.meta.affix);
        state.visitedViews = affixTags;
    },

    DEL_ALL_CACHED_VIEWS: state => {
        state.cachedViews = [];
    },

    UPDATE_VISITED_VIEW: (state, view) => {
        for (let v of state.visitedViews) {
            if (v.path === view.path) {
                // v = Object.assign(v, view);
                v.fullPath = view.fullPath;
                v.meta = view.meta;
                v.name = view.name;
                v.params = view.params;
                v.path = view.path;
                v.query = view.query;
                v.title = view.meta.title || "no-name";
                break;
            }
        }
    },

    GET_VISITED_VIEW: (state, path) => {
        let view = null;
        for (let v of state.visitedViews) {
            if (v.path === path) {
                view = v;
                break;
            }
        }
        return view;
    }
};

const actions = {
    addView({ dispatch }, view) {
        dispatch("addVisitedView", view);
        dispatch("addCachedView", view);
    },
    addVisitedView({ commit }, view) {
        commit("ADD_VISITED_VIEW", view);
    },
    addCachedView({ commit }, view) {
        commit("ADD_CACHED_VIEW", view);
    },

    delView({ dispatch, state }, view) {
        return new Promise(resolve => {
            dispatch("delVisitedView", view);
            dispatch("delCachedView", view);
            resolve({
                visitedViews: [...state.visitedViews],
                cachedViews: [...state.cachedViews]
            });
        });
    },
    delVisitedView({ commit, state }, view) {
        return new Promise(resolve => {
            commit("DEL_VISITED_VIEW", view);
            resolve([...state.visitedViews]);
        });
    },
    delCachedView({ commit, state }, view) {
        return new Promise(resolve => {
            commit("DEL_CACHED_VIEW", view);
            resolve([...state.cachedViews]);
        });
    },

    delOthersViews({ dispatch, state }, view) {
        return new Promise(resolve => {
            dispatch("delOthersVisitedViews", view);
            dispatch("delOthersCachedViews", view);
            resolve({
                visitedViews: [...state.visitedViews],
                cachedViews: [...state.cachedViews]
            });
        });
    },
    delOthersVisitedViews({ commit, state }, view) {
        return new Promise(resolve => {
            commit("DEL_OTHERS_VISITED_VIEWS", view);
            resolve([...state.visitedViews]);
        });
    },
    delOthersCachedViews({ commit, state }, view) {
        return new Promise(resolve => {
            commit("DEL_OTHERS_CACHED_VIEWS", view);
            resolve([...state.cachedViews]);
        });
    },

    delAllViews({ dispatch, state }, view) {
        return new Promise(resolve => {
            dispatch("delAllVisitedViews", view);
            dispatch("delAllCachedViews", view);
            resolve({
                visitedViews: [...state.visitedViews],
                cachedViews: [...state.cachedViews]
            });
        });
    },
    delAllVisitedViews({ commit, state }) {
        return new Promise(resolve => {
            commit("DEL_ALL_VISITED_VIEWS");
            resolve([...state.visitedViews]);
        });
    },
    delAllCachedViews({ commit, state }) {
        return new Promise(resolve => {
            commit("DEL_ALL_CACHED_VIEWS");
            resolve([...state.cachedViews]);
        });
    },

    updateVisitedView({ commit }, view) {
        commit("UPDATE_VISITED_VIEW", view);
    },

    getVisitedView({ commit }, path) {
        commit("GET_VISITED_VIEW", path);
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
