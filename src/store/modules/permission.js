/* eslint-disable */
import RoutesManager from "../../utils/route/RoutesManager";
import Constants from "../../utils/constants/Constants";

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.includes(role));
    }
    return true;
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
    const res = [];
    if (!routes || routes.length == 0) {
        return [];
    }
    routes.forEach(route => {
        const tmp = { ...route };
        if (hasPermission(roles, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, roles);
            }
            res.push(tmp);
        }
    });

    return res;
}

const state = {
    routes: [],
    addRoutes: []
};

const mutations = {
    SET_ROUTES: (state, routes) => {
        const constantRoutes = RoutesManager.getConstantsRoutes();
        state.routes = constantRoutes.concat(routes);
        state.addRoutes = routes;
    }
};

const actions = {
    generateRoutes({ commit }, roles) {
        return new Promise(resolve => {
            const asyncRoutes = RoutesManager.getAsyncRoutes();
            let accessedRoutes;
            if (roles.includes(Constants.defaultSystemRole)) {
                accessedRoutes = asyncRoutes || [];
            } else {
                accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
            }
            commit("SET_ROUTES", accessedRoutes);
            resolve(accessedRoutes);
        });
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
