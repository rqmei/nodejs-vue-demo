import store from "@/store";

export default {
    inserted(el, binding) {
        const { value } = binding;
        const roles = store.getters && store.getters.roles;

        if (value && value instanceof Array && value.length > 0) {
            const rolesInput = value;

            const hasRole = roles.some(permission => {
                return rolesInput.includes(permission);
            });

            if (!hasRole) {
                // eslint-disable-next-line no-unused-expressions
                el.parentNode && el.parentNode.removeChild(el);
            }
        } else {
            throw new Error(`need roles! Like v-role="['super-admin','shop-admin']"`);
        }
    }
};
