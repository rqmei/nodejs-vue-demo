import store from "@/store";

export default {
    inserted(el, binding) {
        const { value } = binding;
        const permissions = store.getters && store.getters.permissions;

        if (value && value instanceof Array && value.length > 0) {
            const permissionsInput = value;

            const hasPermission = permissions.some(permission => {
                return permissionsInput.includes(permission);
            });

            if (!hasPermission) {
                el.parentNode && el.parentNode.removeChild(el);
            }
        } else {
            throw new Error(`need permissions! Like v-permission="['article-add','article-del']"`);
        }
    }
};
