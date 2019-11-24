<!--
 * @Description: 背景色组件
 * @Author: xwq
 * @Date: 2019-05-17 10:11:31
 -->
<template>
    <div class="page">
        <div class="background" ref="background"></div>
    </div>
</template>
<script>
export default {
    props: {
        background: {
            type: String
        }
    },
    data() {
        return {};
    },
    created() {},
    mounted() {
        if (this.background) {
            this.$refs.background.setAttribute(
                "style",
                `background-color:${this.background}`
            );
        }
    }
};
</script>
<style lang="less" scoped>
.page {
    .background {
        position: fixed;
        right: 0;
        left: 0;
        top: 0;
        bottom: 0;
        background-color: #f2f2f2;
        margin: 0 auto;
        z-index: -1;
    }
}
</style>
