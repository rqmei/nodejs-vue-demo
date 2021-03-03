<template>
    <div :class="{ hidden: hidden }" class="pagination-container">
        <el-pagination
            v-show="total > 0"
            :background="background"
            :current-page.sync="currentPageInner"
            :page-size.sync="pageSizeInner"
            :layout="layout"
            :page-sizes="pageSizes"
            :total="total"
            v-bind="$attrs"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
    </div>
</template>

<script>
import { scrollTo } from "../../../utils/supplement/ScrollToUtil.js";
import Constants from "../../../utils/constants/Constants.js";

export default {
    name: "Pagination",
    props: {
        total: {
            required: true,
            type: Number,
            default: 0
        },
        currentPage: {
            type: Number,
            default: Constants.page.currentPage
        },
        pageSize: {
            type: Number,
            default: Constants.page.pageSize
        },
        pageSizes: {
            type: Array,
            default() {
                return Constants.page.pageSizes;
            }
        },
        layout: {
            type: String,
            default: "total, sizes, prev, pager, next, jumper"
        },
        background: {
            type: Boolean,
            default: true
        },
        autoScroll: {
            type: Boolean,
            default: true
        },
        hidden: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        currentPageInner: {
            get() {
                return this.currentPage;
            },
            set(val) {
                this.$emit("update:currentPage", val);
            }
        },
        pageSizeInner: {
            get() {
                return this.pageSize;
            },
            set(val) {
                this.$emit("update:pageSize", val);
            }
        }
    },
    methods: {
        handleSizeChange(val) {
            this.$emit("pagination", { currentPage: this.currentPageInner, pageSize: val });
            if (this.autoScroll) {
                scrollTo(0, 800);
            }
        },
        handleCurrentChange(val) {
            this.$emit("pagination", { currentPage: val, pageSize: this.pageSizeInner });
            if (this.autoScroll) {
                scrollTo(0, 800);
            }
        }
    }
};
</script>

<style scoped>
.pagination-container {
    padding: 32px 0;
}
.pagination-container.hidden {
    display: none;
}
</style>
