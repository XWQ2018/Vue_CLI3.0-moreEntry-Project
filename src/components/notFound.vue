<!--
 * @Description: NotFound组件
 * @Author: xwq
 * @Date: 2019-05-17 14:52:27
 -->
<template>
    <div class="page">
        <h3>页面走丢了。。</h3>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    },
    created() {},
    mounted() {}
};
</script>
<style lang="less" scoped>
.page {
    width: 100%;
    height: 100%;
    h3 {
        width: 100%;
        font-size: 18px;
        padding: 10px 20px;
        color: #f2f2f2;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
}
</style>
