<template>
    <el-scrollbar ref="scrollContainer" :vertical="false" class="scroll-container" @wheel.native.prevent="handleScroll">
        <slot />
    </el-scrollbar>
</template>

<script>
const tagAndTagSpacing = 3;

export default {
    name: "ScrollPane",
    data() {
        return {
            left: 0
        };
    },
    computed: {
        scrollWrapper() {
            return this.$refs.scrollContainer.$refs.wrap;
        }
    },
    methods: {
        handleScroll(e) {
            const eventDelta = e.wheelDelta || -e.deltaY * 40;
            const $scrollWrapper = this.scrollWrapper;
            $scrollWrapper.scrollLeft += eventDelta / 4;
        },
        moveToTarget(currentTag) {
            const $container = this.$refs.scrollContainer.$el;
            const $containerWidth = $container.offsetWidth;
            const $scrollWrapper = this.scrollWrapper;
            const tagList = this.$parent.$refs.tag;

            let firstTag = null;
            let lastTag = null;

            // 找到第一个和最后一个标签
            if (tagList.length > 0) {
                firstTag = tagList[0];
                lastTag = tagList[tagList.length - 1];
            }

            if (firstTag === currentTag) {
                $scrollWrapper.scrollLeft = 0;
            } else if (lastTag === currentTag) {
                $scrollWrapper.scrollLeft = $scrollWrapper.scrollWidth - $containerWidth;
            } else {
                // 找到前后2个标签
                const currentIndex = tagList.findIndex(item => item === currentTag);
                const prevTag = tagList[currentIndex - 1];
                const nextTag = tagList[currentIndex + 1];

                // 下一个标签的左边际
                const afterNextTagOffsetLeft = nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagAndTagSpacing;

                // 前一个标签的左边际
                const beforePrevTagOffsetLeft = prevTag.$el.offsetLeft - tagAndTagSpacing;

                if (afterNextTagOffsetLeft > $scrollWrapper.scrollLeft + $containerWidth) {
                    $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth;
                } else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
                    $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft;
                }
            }
        },

        moveToRight() {
            const $container = this.$refs.scrollContainer.$el;
            const $scrollWrapper = this.scrollWrapper;
            const $containerWidth = $container.offsetWidth;

            // 找到最后一个标签的左坐标位置
            const tagList = this.$parent.$refs.tag;
            const lastTag = tagList[tagList.length - 1];
            const lastTagOffsetLeft = lastTag.$el.offsetLeft + lastTag.$el.offsetWidth + tagAndTagSpacing;

            $scrollWrapper.scrollLeft = lastTagOffsetLeft + $containerWidth;
        },
        moveToLeft() {
            const $scrollWrapper = this.scrollWrapper;
            $scrollWrapper.scrollLeft = 0;
        }
    }
};
</script>

<style lang="scss" scoped>
.scroll-container {
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    width: 100%;

    .el-scrollbar__bar {
        bottom: 0px;
    }
    .el-scrollbar__wrap {
        height: 49px;
    }
}
</style>
