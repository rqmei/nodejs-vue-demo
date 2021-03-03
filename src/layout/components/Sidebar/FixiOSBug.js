export default {
    computed: {
        device() {
            return this.$store.state.app.device;
        }
    },
    mounted() {
        this.fixBugIniOS();
    },
    methods: {
        fixBugIniOS() {
            const $subMenu = this.$refs.subMenu;
            if ($subMenu) {
                const { handleMouseleave } = $subMenu;
                $subMenu.handleMouseleave = e => {
                    if (this.device === "mobile") {
                        return;
                    }
                    handleMouseleave(e);
                };
            }
        }
    }
};
