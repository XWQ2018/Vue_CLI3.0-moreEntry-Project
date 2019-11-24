<template>
    <div class="page-index">
        <h2 :class="$style.blue">我是page2页</h2>
        <van-button type="warning">page2页的确定</van-button>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    },
    created() {},
    mounted() {},
    methods: {}
};
</script>
<style module>
.blue {
    color: #00f !important;
}
</style>
<style lang="less" scoped>
.page-index {
    text-align: center;
    h2 {
        padding: 20px;
        color: #f00;
        font-size: 18px;
    }
}
</style>