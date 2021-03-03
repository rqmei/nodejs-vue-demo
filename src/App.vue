<template>
    <div id="app">
        <router-view v-if="isRouterAlive"></router-view>
    </div>
</template>

<script>
export default {
    name: "App",
    /**
     * provide 选项应该是一个对象或返回一个对象的函数。该对象包含可注入其子孙的属性
     * 使用场景：
     * 由于vue有$parent属性可以让子组件访问父组件。但孙组件想要访问祖先组件就比较困难。
     * 通过provide/inject可以轻松实现跨级访问祖先组件的数据
     * @returns {{reload: default.methods.reload}} 父组件中返回要传给下级的数据
     */
    provide() {
        return {
            reload: this.reload
        };
    },
    data() {
        return {
            isRouterAlive: true
        };
    },
    methods: {
        // 重新加载
        reload() {
            this.isRouterAlive = false;
            this.$nextTick(function() {
                this.isRouterAlive = true;
            });
        }
    }
};
</script>
