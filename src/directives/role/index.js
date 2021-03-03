import role from "./role";

const install = function(Vue) {
    Vue.directive("role", role);
};

if (window.Vue) {
    window.role = role;
    // eslint-disable-next-line no-undef
    Vue.use(install);
}

role.install = install;
export default role;
