<template>
    <div class="no-data-empty">
        <!--占位内容-->
        <div class="no-data-empty-content">
            <img class="no-data-img" :src="getNoDataImage()" />
            <div class="title-wrap">{{ getNoDataTitle() }}</div>
            <div class="button-group" v-if="isHasOperation">
                <el-button size="small" type="primary" @click.prevent="onClickButtonEvent">{{ operationTitle }}</el-button>
            </div>
        </div>
    </div>
</template>

<script src="./NoDataEmpty.js"></script>

<style lang="scss">
@import "./NoDataEmpty.scss";
</style>
