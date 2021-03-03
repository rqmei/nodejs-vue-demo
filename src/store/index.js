import Vue from "vue";
import Vuex from "vuex";
import persistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
import getters from "./getters";
import settings from "../settings";
import Constants from "../utils/constants/Constants";

Vue.use(Vuex);

const secureLS = new SecureLS({ isCompression: false });

const modulesFiles = require.context("./modules", true, /\.js$/);
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
    const value = modulesFiles(modulePath);
    modules[moduleName] = value.default;
    return modules;
}, {});

const persistedStateSecureLS = persistedState({
    key: Constants.globalLocalStorageKeys.GLOBAL_STATE_DATA_KEY,
    storage: {
        getItem: key => secureLS.get(key),
        setItem: (key, value) => secureLS.set(key, value),
        removeItem: key => secureLS.remove(key)
    }
});

const persistedStateNormal = persistedState({
    key: Constants.globalLocalStorageKeys.GLOBAL_STATE_DATA_KEY,
    storage: window.localStorage
});

const persistedStateUse = settings.localStoreEncrypt ? persistedStateSecureLS : persistedStateNormal;

const store = new Vuex.Store({
    modules,
    getters,
    plugins: [persistedStateUse]
});

export default store;
